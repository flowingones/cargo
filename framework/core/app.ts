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
  listen(port);
}

function link(middleware: Middleware) {
  chain.push(middleware);
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

const App = {
  run,
  link,
};
