import {
  EntityTooLargeException,
  InternalServerException,
  RequestContext,
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
    if (ctx.request.body) {
      const buffer = await readToMaxSize(ctx.request.body);
      const parser = options.paser?.find((parser) => {
        return parser.mimeType === ctx.request.headers.get("content-type");
      });
      if (typeof parser?.parse !== "function") {
        throw new InternalServerException(
          "Content type of request not supported",
        );
      }
      ctx.body = parser.parse(buffer);
    }
    return next(ctx);
  };
}

async function readToMaxSize(
  stream: ReadableStream<Uint8Array>,
): Promise<Uint8Array> {
  const buffer = await readAll(stream.getReader());
  return buffer;
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

function isExceeding(buffer: Uint8Array, value: Uint8Array) {
  return (value.length > options.maxBodySize ||
    buffer.byteLength > options.maxBodySize);
}
