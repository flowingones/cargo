import { Middleware, walkthroughAndHandle } from "./middleware/middleware.ts";
import { HttpException } from "./exceptions/http-exception.ts";
import { loadRoutes } from "./routing/file-loader.ts";
import { CARGO_DEFAULT_PORT } from "./constants.ts";
import { HttpStatus } from "../shared/mod.ts";
import { Router } from "./routing/router.ts";
import { listenAndServe } from "../deps.ts";
import { log } from "../shared/logger.ts";

const CONTEXT = "APP";
const PORT = CARGO_DEFAULT_PORT;

const chain: Middleware[] = [];

export async function bootstrap() {
  if (!await loadRoutes()) {
    log(CONTEXT, "No routes from the 'routes' directory loaded!");
  }
  return App;
}

function run(port = PORT): void {
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

function handleException(exception: unknown): Response {
  let body: HttpException = {
    name: "Http Exception",
    message: "Internal Server Error",
    status: HttpStatus.INTERAL_ERROR,
  };
  if (exception instanceof HttpException) {
    body = {
      name: (exception as HttpException).name,
      message: (exception as HttpException).message,
      status: (exception as HttpException).status,
    };
  }
  console.error(exception);
  return new Response(JSON.stringify(body));
}

const App = {
  run,
  link,
};
