import {
  EntityTooLargeException,
  RequestContext,
  UnsupportedMediaTypeException,
} from "../../http/mod.ts";
import { Next } from "../middleware.ts";
import { JSONParser } from "./json-parser.ts";

export interface Parser<T> {
  mimeType: string;
  parse: (buffer: Uint8Array) => T;
}

interface ParserOptions {
  maxBodySize: number;
  paser?: Parser<unknown>[];
}

let options: ParserOptions = {
  maxBodySize: 1024,
  paser: [JSONParser],
};

export function parseBody(parserOptions?: ParserOptions) {
  options = { ...options, ...parserOptions };
  return async (ctx: RequestContext, next: Next) => {
    const contentType = ctx.request.headers.get("content-type")?.split(" ")[0]
      ?.replace(";", "");
    if (ctx.request.body && contentType) {
      const parser = options.paser?.find((parser) => {
        return parser.mimeType === contentType;
      });
      if (typeof parser?.parse !== "function") {
        throw new UnsupportedMediaTypeException(
          "Content type of request not supported",
        );
      }
      ctx.body = parser.parse(await readToMaxSize(ctx.request.body));
    }
    return next(ctx);
  };
}

function readToMaxSize(
  stream: ReadableStream<Uint8Array>,
): Promise<Uint8Array> {
  return readAll(stream.getReader());
}

async function readAll(
  reader: ReadableStreamDefaultReader,
): Promise<Uint8Array> {
  let isDone = false;
  let buffer = new Uint8Array(0);
  while (!isDone) {
    const { done, value } = await reader.read();
    if (done) {
      isDone = true;
      break;
    }
    if (isExceeding(buffer, value)) {
      throw new EntityTooLargeException(
        `Max. body size of ${options.maxBodySize} bytes exceeded`,
      );
    }
    buffer = new Uint8Array([...buffer, ...value]);
  }
  return buffer;
}

function isExceeding(buffer: Uint8Array, value: Uint8Array): boolean {
  return (value.length > options.maxBodySize ||
    buffer.byteLength > options.maxBodySize);
}
