import { BootstrapOptions } from "./http/mod.ts";
import { Middleware } from "./middleware/mod.ts";
import { CARGO_PORT } from "./constants.ts";
import { init } from "./http/context.ts";
import { override } from "./utils/options.ts";

export interface DefaultBootstrapOptions extends BootstrapOptions {
  defaultContext: string;
  port: number;
  autoloadRoutes: boolean;
  autoloadPages: boolean;
  autoloadAssets: boolean;
}

const bootstrapOptions: DefaultBootstrapOptions = {
  defaultContext: "http",
  port: CARGO_PORT,
  autoloadRoutes: true,
  autoloadPages: true,
  autoloadAssets: true,
};

interface App {
  run(port?: number): void;
  setContext(context: RegisteredContext): App;
  getContext(name: string): Context | undefined;
  middleware(middleware: Middleware | Middleware[]): App;
}

interface Context {
  middleware(middleware: Middleware | Middleware[]): Context;
  listen(port?: number): void;
}

interface RegisteredContext {
  name: string;
  context: Context;
}

const App: App = {
  run,
  setContext,
  getContext,
  middleware,
};

const contexts: RegisteredContext[] = [];

export async function bootstrap(
  options: BootstrapOptions = {},
): Promise<App> {
  override(bootstrapOptions, options);

  setContext({
    name: "http",
    context: await init(bootstrapOptions),
  });

  return App;
}

function run(port: number = CARGO_PORT): void {
  for (const context of contexts) {
    if (context.name === bootstrapOptions.defaultContext) {
      context.context.listen(port);
    } else {
      context.context.listen();
    }
  }
}

function middleware(
  middleware: Middleware | Middleware[],
): App {
  contexts.find((context) => {
    return context.name === bootstrapOptions.defaultContext;
  })?.context?.middleware(middleware);
  return App;
}

function setContext(context: RegisteredContext): App {
  contexts.push(context);
  return App;
}

function getContext(name: string): Context | undefined {
  return contexts.find((context) => {
    return context.name === name;
  })?.context;
}
