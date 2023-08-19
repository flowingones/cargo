import { HttpProtocol, HttpProtocolOptions } from "./http/mod.ts";
import { Middleware } from "./middleware/mod.ts";
import { CARGO_DEFAULT_PORT } from "./constants.ts";
import { Hooks, Tasks, TaskWorker } from "./tasks.ts";
import { Protocol } from "./protocol.ts";

export type BootstrapOptions = {
  protocol?: Protocol;
  defaultProtocolOptions?: HttpProtocolOptions;
  port?: number;
  tasks?: Partial<Tasks>;
};

export async function bootstrap(
  options?: Partial<BootstrapOptions>,
): Promise<App> {
  const taskWorker = new TaskWorker();
  const appOptions: AppOptions = {
    protocol: options?.protocol ||
      new HttpProtocol(options?.defaultProtocolOptions),
    port: options?.port || CARGO_DEFAULT_PORT,
    taskWorker,
    tasks: options?.tasks,
  };

  const app = new App(appOptions);

  await taskWorker.process(taskWorker.hooks(Hooks.onBootstrap), app);

  return app;
}

interface AppOptions {
  taskWorker?: TaskWorker;
  tasks?: Partial<Tasks>;
  port: number;
  protocol: Protocol;
}

export class App {
  #options: Omit<AppOptions, "taskWorker" | "tasks">;
  #tasksWorker?: TaskWorker;

  constructor(options: AppOptions) {
    const { taskWorker, tasks, ...rest } = options;
    this.#options = rest;
    if (tasks && taskWorker) {
      this.#tasksWorker = taskWorker;
      this.#registerTasks(tasks);
    }
  }

  run(port: number = this.#options.port): void {
    this.#options.protocol.listen(port);
  }

  middleware(
    middleware: Middleware | Middleware[],
  ): App {
    this.#options.protocol.middleware(middleware);
    return this;
  }

  getProtocol(): Protocol {
    return this.#options.protocol;
  }

  #registerTasks(tasks: Partial<Tasks>) {
    if (Array.isArray(tasks.onBootstrap)) {
      tasks.onBootstrap.forEach((task) => {
        this.#tasksWorker?.add({ type: Hooks.onBootstrap, task });
      });
    }
  }
}
