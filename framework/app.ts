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
  [key: string]: unknown;
  port?: number;
  autoloadRoutes?: boolean;
  autoloadPages?: boolean;
  autoloadAssets?: boolean;
}

interface DefaultBootstrapOptions extends BootstrapOptions {
  port: number;
  autoloadRoutes: boolean;
  autoloadPages: boolean;
  autoloadAssets: boolean;
}

const bootstrapOptions: DefaultBootstrapOptions = {
  port: CARGO_PORT,
  autoloadRoutes: true,
  autoloadPages: true,
  autoloadAssets: true,
};

export async function bootstrap(options: BootstrapOptions = {}) {
  overrideBootstrapOptions(options);

  if (bootstrapOptions.autoloadRoutes) {
    await autoloadRoutes(CARGO_ROUTES_DIRECTORY);
  }

  if (bootstrapOptions.autoloadAssets) {
    await assetsFromDir();
  }

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

async function autoloadRoutes(path: string): Promise<boolean> {
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
  if (routesLoaded) {
    log(CONTEXT, "No routes from the 'routes' directory loaded!");
  }
  return routesLoaded;
}

function overrideBootstrapOptions(
  options: BootstrapOptions,
): void {
  for (const option in bootstrapOptions) {
    if (options[option]) {
      bootstrapOptions[option] = options[option];
    }
  }
}
