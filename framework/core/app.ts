import { Middleware, walkthroughAndHandle } from "./middleware/middleware.ts";
import { loadRoutes } from "./routing/file-loader.ts";
import { CARGO_PORT, CARGO_ROUTES_DIRECTORY } from "./constants.ts";
import { Router } from "./routing/router.ts";
import { listenAndServe } from "../deps.ts";
import { handleException } from "./exceptions/handle-exception.ts";
import { log } from "../shared/logger.ts";

const CONTEXT = "APP";

const chain: Middleware[] = [];

export async function bootstrap() {
  if (!await loadRoutes(CARGO_ROUTES_DIRECTORY)) {
    log(CONTEXT, "No routes from the 'routes' directory loaded!");
  }
  return App;
}

function run(port = CARGO_PORT): void {
  logRegisteredRoutes();
  listen(port);
}

function middleware(middleware: Middleware | Middleware[]) {
  if (middleware instanceof Array) {
    for (const eachMiddleware of middleware) {
      chain.push(eachMiddleware);
    }
  } else {
    chain.push(middleware);
  }
  return App;
}

function listen(port: number) {
  listenAndServe(`:${port}`, async (request: Request) => {
    try {
      return await walkthroughAndHandle(
        {
          request: request,
          response: new Response(),
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

function logRegisteredRoutes() {
  Router.getRoutes().forEach((route) => {
    log("ROUTE", `${route.method} ${route.path.pathname}`);
  });
}

const App = {
  run,
  middleware,
};
