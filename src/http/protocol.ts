import { handleException, Router } from "./mod.ts";
import { log } from "../utils/mod.ts";
import { serve } from "../deps.ts";
import {
  addRawBodyToContext,
  addSearchParamsToContext,
  Middleware,
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

export function init() {
  middleware([
    addSearchParamsToContext,
    addRawBodyToContext,
  ]);
  return Protocol;
}

function listen(port: number) {
  logRegisteredRoutes();

  if (!port) {
    throw new Error("Http port not defined!");
  }

  serve(
    async (request: Request) => {
      try {
        return await walkthroughAndHandle(
          {
            request: request,
          },
          chain,
          Router.resolve,
        );
      } catch (error: unknown) {
        return handleException(error);
      }
    },
    {
      port: port,
    },
  );
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
