import { init, InitOptions } from "./http/mod.ts";
import { Middleware } from "./middleware/mod.ts";
import { CARGO_PORT } from "./constants.ts";

export interface BootstrapOptions extends InitOptions {
  defaultProtocol: string;
  port: number;
  autoloadRoutes: boolean;
  autoloadAssets: boolean;
}

let defaultOptions: BootstrapOptions = {
  defaultProtocol: "http",
  port: CARGO_PORT,
  autoloadRoutes: true,
  autoloadAssets: true,
  autoloader: [],
};

interface App {
  run(port?: number): void;
  setProtocol(protocol: RegisteredProtocol): App;
  getProtocol(name: string): Protocol | undefined;
  middleware(middleware: Middleware | Middleware[]): App;
}

interface Protocol {
  middleware(middleware: Middleware | Middleware[]): Protocol;
  listen(port?: number): void;
}

interface RegisteredProtocol {
  name: string;
  protocol: Protocol;
}

const App: App = {
  run,
  setProtocol,
  getProtocol,
  middleware,
};

const protocols: RegisteredProtocol[] = [];

export async function bootstrap(
  options: InitOptions = {},
): Promise<App> {
  defaultOptions = { ...defaultOptions, ...options };

  setProtocol({
    name: "http",
    protocol: await init(defaultOptions),
  });

  return App;
}

function run(port: number = defaultOptions.port): void {
  for (const protocol of protocols) {
    if (protocol.name === defaultOptions.defaultProtocol) {
      protocol.protocol.listen(port);
    } else {
      protocol.protocol.listen();
    }
  }
}

function middleware(
  middleware: Middleware | Middleware[],
): App {
  protocols.find((protocol) => {
    return protocol.name === defaultOptions.defaultProtocol;
  })?.protocol?.middleware(middleware);
  return App;
}

function setProtocol(protocol: RegisteredProtocol): App {
  protocols.push(protocol);
  return App;
}

function getProtocol(name: string): Protocol | undefined {
  return protocols.find((protocol) => {
    return protocol.name === name;
  })?.protocol;
}
