import { serve } from "./deps.ts";
import { assetsFromDir, Router } from "./http/mod.ts";
import { handleException } from "./exceptions/handle-exception.ts";
import {
  Middleware,
  rawBody,
  searchParams,
  walkthroughAndHandle,
} from "./middleware/mod.ts";
import { isDirectory, log } from "./utils/mod.ts";

import { CARGO_PORT, CARGO_ROUTES_DIRECTORY } from "./constants.ts";

const CONTEXT = "APP";

const chain: Middleware[] = [];
export interface BootstrapOptions {
  port: number;
}

const bootstrapOptions: BootstrapOptions = {
  port: CARGO_PORT,
};

export async function bootstrap() {
  if (!(await loadRoutes(CARGO_ROUTES_DIRECTORY))) {
    log(CONTEXT, "No routes from the 'routes' directory loaded!");
  }

  await assetsFromDir();

  middleware(rawBody);
  middleware(searchParams);

  return App;
}

function run(port = bootstrapOptions.port): void {
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
