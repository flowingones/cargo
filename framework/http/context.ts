import { handleException } from "../exceptions/handle-exception.ts";
import { autoloadAssets, autoloadRoutes, Router } from "./mod.ts";
import {
  CARGO_ASSETS_DIRECTORY,
  CARGO_ROUTES_DIRECTORY,
} from "../constants.ts";
import { log } from "../utils/mod.ts";
import { serve } from "../deps.ts";
import {
  Middleware,
  rawBody,
  searchParams,
  walkthroughAndHandle,
} from "../middleware/mod.ts";

const CONTEXT = "CONTEXT(HTTP)";
const chain: Middleware[] = [];

export interface BootstrapOptions {
  [key: string]: unknown;
  port?: number;
  autoloadRoutes?: boolean;
  autoloadPages?: boolean;
  autoloadAssets?: boolean;
}

const Context = {
  listen,
  middleware,
};

export async function init(options: BootstrapOptions = {}) {
  if (options.autoloadRoutes) {
    await autoloadRoutes(CARGO_ROUTES_DIRECTORY, CONTEXT);
  }

  if (options.autoloadAssets) {
    await autoloadAssets(CARGO_ASSETS_DIRECTORY, CONTEXT);
  }

  middleware(rawBody);
  middleware(searchParams);

  return Context;
}

function listen(port: number) {
  logRegisteredRoutes();

  if (!port) {
    throw new Error("Http Port not defined!");
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
  if (middleware instanceof Array) {
    for (const eachMiddleware of middleware) {
      chain.push(eachMiddleware);
    }
  } else {
    chain.push(middleware);
  }
  return Context;
}

function logRegisteredRoutes() {
  Router.getRoutes().forEach((route) => {
    log("ROUTE", `${route.method} ${route.path.pathname}`);
  });
}
