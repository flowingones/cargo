type Newable<T> = {
  new (...args: unknown[]): T;
};

type Callable<T> = (...args: unknown[]) => unknown;

export interface Dependencies {
  dependencies: unknown[];
}

export interface ClassToInject<T> extends Dependencies {
  class: Newable<T>;
}
export interface FunctionToInject<T> extends Dependencies {
  function: Callable<T>;
}

export interface ValueToInject<T> {
  token: string;
  toInject: T;
}

export const registry: (
  | ClassToInject<unknown>
  | FunctionToInject<unknown>
  | ValueToInject<unknown>
)[] = [];

export type Dependency =
  | Callable<unknown>
  | Newable<unknown>
  | string
  | Record<string, unknown>;

export function inject<T>(token: Newable<T> | Callable<T> | string): T {
  const toInject = registry.find((injectable) => {
    if ("class" in injectable) {
      return injectable.class === token;
    }
    if ("function" in injectable) {
      return injectable.function === token;
    }
    if ("token" in injectable) {
      return injectable.token === token;
    }
    return false;
  });

  if (toInject && "class" in toInject) {
    return <T> new toInject.class(...toInject.dependencies);
  }
  if (toInject && "function" in toInject) {
    return <T> toInject.function(...toInject.dependencies);
  }
  if (toInject && "toInject" in toInject) {
    return <T> toInject.toInject;
  }
  throw Error("Dependency can not be injected!");
}

export function register<T>(
  toInject: ClassToInject<T> | FunctionToInject<T> | ValueToInject<T>,
) {
  registry.push(toInject);
}

export const Injector = {
  inject,
  register,
};
