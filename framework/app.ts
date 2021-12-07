import { listenAndServe } from "./deps.ts";
import { Router } from "./http/router.ts";
import { handleException } from "./exceptions/handle-exception.ts";
import {
  Middleware,
  rawBody,
  searchParams,
  walkthroughAndHandle,
} from "./middleware/mod.ts";

import { log } from "./mod.ts";

import { CARGO_PORT, CARGO_ROUTES_DIRECTORY } from "./constants.ts";

const CONTEXT = "APP";

const chain: Middleware[] = [];

export async function bootstrap() {
  if (!(await loadRoutes(CARGO_ROUTES_DIRECTORY))) {
    log(CONTEXT, "No routes from the 'routes' directory loaded!");
  }

  middleware(rawBody);
  middleware(searchParams);

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

async function loadRoutes(path: string): Promise<boolean> {
  let routesLoaded = false;

  if (!(await isDirectory(path))) {
    return routesLoaded;
  }

  for await (const file of Deno.readDir(path)) {
    if (!routesLoaded) {
      routesLoaded = true;
    }
    if (file.isFile) {
      try {
        await import(`file://${Deno.cwd()}/${path}/${file.name}`);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return routesLoaded;
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    if ((await Deno.lstat(path)).isDirectory) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
