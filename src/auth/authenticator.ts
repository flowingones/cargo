import { RequestContext, UnauthorizedException } from "../http/mod.ts";
import { Middleware, Next } from "../middleware/middleware.ts";

export interface Instructions<T> {
  allow: (entity: T) => void;
  deny: (reason: string) => void;
}

export interface Strategy<T> {
  name: string;
  authenticate: (ctx: RequestContext, instructions: Instructions<T>) => void;
}

function authentication<T>(
  strategy: Strategy<T>,
  ctx: RequestContext,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    strategy.authenticate(ctx, { allow: resolve, deny: reject });
  });
}

const strategies: Strategy<unknown>[] = [];

function protectWith<T>(strategyName: string): Middleware {
  const strategy = <Strategy<T> | undefined> (
    strategies.find((strategy) => strategy.name == strategyName)
  );
  if (strategy) {
    return async (ctx: RequestContext, next: Next): Promise<Response> => {
      try {
        ctx.auth = await authentication<T>(strategy, ctx);
      } catch (message) {
        throw new UnauthorizedException(message);
      }
      return next(ctx);
    };
  }
  throw Error("Strategy not defined!");
}

function strategy<T>(strategy: Strategy<T>) {
  strategies.push(strategy);
}

export const Authenticator = {
  protectWith,
  strategy,
};
