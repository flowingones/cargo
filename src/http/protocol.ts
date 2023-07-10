import { handleException, Router } from "./mod.ts";
import { log } from "../utils/mod.ts";
import {
  addRawBodyToContext,
  addSearchParamsToContext,
  Middleware,
  parseBody,
  walkthroughAndHandle,
} from "../middleware/mod.ts";

const CONTEXT = "PROTOCOL (HTTP)";
const chain: Middleware[] = [];

export interface InitOptions {
  [key: string]: unknown;
  port?: number;
}

const Protocol = {
  listen,
  middleware,
  router: Router,
};

export function init(options?: { rawBody?: boolean }) {
  middleware([
    addSearchParamsToContext,
    options?.rawBody ? addRawBodyToContext : parseBody(),
  ]);
  return Protocol;
}

function listen(port: number) {
  logRegisteredRoutes();

  if (!port) {
    throw new Error("Http port not defined!");
  }

  Deno.serve({
    port: port,
  }, async (request: Request, connection: Deno.ServeHandlerInfo) => {
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
  });
  log(CONTEXT, `Listening on http://localhost:${port}`);
}

function middleware(middleware: Middleware | Middleware[]) {
  if (Array.isArray(middleware)) {
    for (const eachMiddleware of middleware) {
      chain.push(eachMiddleware);
    }
  } else {
    chain.push(middleware);
  }
  return Protocol;
}

function logRegisteredRoutes() {
  Router.getRoutes().forEach((route) => {
    log("ROUTE", `${route.method} ${route.path.pathname}`);
  });
}
