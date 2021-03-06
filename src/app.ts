import { init } from "./http/mod.ts";
import { Middleware } from "./middleware/mod.ts";
import { CARGO_PORT } from "./constants.ts";
import { Hooks, Tasks, TaskWorker } from "./tasks.ts";

export interface BootstrapOptions {
  defaultProtocol: string;
  port: number;
  tasks?: Partial<Tasks>;
}

let defaultOptions: BootstrapOptions = {
  defaultProtocol: "http",
  port: CARGO_PORT,
};

export interface App {
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

const app: App = {
  run,
  setProtocol,
  getProtocol,
  middleware,
};

const protocols: RegisteredProtocol[] = [];

export async function bootstrap(
  options: Partial<BootstrapOptions> = {},
): Promise<App> {
  defaultOptions = { ...defaultOptions, ...options };

  if (defaultOptions.tasks) {
    registerTasks(defaultOptions.tasks);
  }

  setProtocol({
    name: "http",
    protocol: await Promise.resolve(init()),
  });

  await TaskWorker.process(TaskWorker.hooks(Hooks.onBootstrap), app);

  return app;
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
  return app;
}

function setProtocol(protocol: RegisteredProtocol): App {
  protocols.push(protocol);
  return app;
}

function getProtocol(name: string): Protocol | undefined {
  return protocols.find((protocol) => {
    return protocol.name === name;
  })?.protocol;
}

function registerTasks(tasks: Partial<Tasks>) {
  if (Array.isArray(tasks.onBootstrap)) {
    tasks.onBootstrap.forEach((task) => {
      TaskWorker.add({ type: Hooks.onBootstrap, task });
    });
  }
}
