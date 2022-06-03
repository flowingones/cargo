export type Task = (...arg: unknown[]) => Promise<void> | void;

export enum Hooks {
  onBootstrap = "onBootstrap",
}

export interface ToRegister {
  type: Hooks;
  task: Task;
}

export type Tasks = Record<Hooks, Task[]>;

const registry: Tasks = {
  onBootstrap: [],
};

function add(task: ToRegister) {
  registry[task.type].push(task.task);
}

function hooks(hookType: Hooks): Task[] {
  return registry[hookType];
}

async function process(tasks: Task[]) {
  for (const task of tasks) {
    if (task instanceof Promise) {
      await task();
    }
    await Promise.resolve(task());
  }
}

export const TaskWorker = {
  add,
  hooks,
  process,
};
