import { handleException, Router } from "./mod.ts";
import { serve } from "std/http/server.ts";

import { info, log } from "../utils/mod.ts";
import {
  addRawBodyToContext,
  addSearchParamsToContext,
  bodyParser,
  Middleware,
  walkthroughAndHandle,
} from "../middleware/mod.ts";
import { BodyParserOptions } from "../middleware/body-parser/body-parser.ts";

import { type Protocol, type ProtocolConnectionInfo } from "../mod.ts";

const LOG_CONTEXT = "PROTOCOL (HTTP)";
const chain: Middleware[] = [];

export interface HttpProtocolOptions {
  rawBody?: boolean;
  legacyServe?: boolean;
  bodyParserOptions?: BodyParserOptions;
}

export class HttpProtocol implements Protocol {
  #options?: HttpProtocolOptions;
  constructor(options?: HttpProtocolOptions) {
    this.#options = options;
    this.middleware([
      addSearchParamsToContext,
      options?.rawBody ? addRawBodyToContext : bodyParser(
        options?.bodyParserOptions && { ...options.bodyParserOptions },
      ),
    ]);
  }

  listen(port: number) {
    logRegisteredRoutes();

    if (!port) {
      throw new Error("Http port not defined!");
    }
    if (this.#options?.legacyServe) {
      info(LOG_CONTEXT, "Legacy server started");

      serve(this.#handle, {
        port: port,
      });
    } else {
      Deno.serve({
        port: port,
      }, this.#handle);
    }
    log(LOG_CONTEXT, `Listening on http://localhost:${port}`);
  }

  middleware(middleware: Middleware | Middleware[]): HttpProtocol {
    if (Array.isArray(middleware)) {
      for (const eachMiddleware of middleware) {
        chain.push(eachMiddleware);
      }
    } else {
      chain.push(middleware);
    }
    return this;
  }

  async #handle(
    request: Request,
    connection: ProtocolConnectionInfo,
  ): Promise<Response> {
    try {
      return await walkthroughAndHandle(
        {
          request,
          connection,
        },
        chain,
        Router.resolve,
      );
    } catch (error: unknown) {
      return handleException(error);
    }
  }
}

function logRegisteredRoutes() {
  Router.getRoutes().forEach((route) => {
    log("ROUTE", `${route.method} ${route.path.pathname}`);
  });
}
