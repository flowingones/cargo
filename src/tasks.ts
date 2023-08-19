import { App } from "./app.ts";

export type Task = (app: App) => Promise<void> | void;

export enum Hooks {
  onBootstrap = "onBootstrap",
}

export interface ToRegister {
  type: Hooks;
  task: Task;
}

export type Tasks = Record<Hooks, Task[]>;

export class TaskWorker {
  #registry: Tasks = { onBootstrap: [] };

  add(task: ToRegister) {
    this.#registry[task.type].push(task.task);
  }

  hooks(hookType: Hooks): Task[] {
    return this.#registry[hookType];
  }

  async process(tasks: Task[], app: App) {
    for (const task of tasks) {
      if (task instanceof Promise) {
        await task(app);
      }
      await Promise.resolve(task(app));
    }
  }
}
