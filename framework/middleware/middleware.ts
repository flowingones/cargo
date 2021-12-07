import { Handler, RequestContext } from "../http/mod.ts";

export type Next = (ctx: RequestContext) => Promise<Response>;

export type Middleware = (cxt: RequestContext, next: Next) => Promise<Response>;

export function walkthroughAndHandle(
  ctx: RequestContext,
  chain: Middleware[],
  handler: Handler,
) {
  let i = 0;

  function next(ctx: RequestContext): Promise<Response> {
    const middleware = chain[i];
    if (typeof middleware === "function") {
      i++;
      return middleware(ctx, next);
    }
    if (handler instanceof Promise) {
      return handler(ctx) as Promise<Response>;
    }
    return new Promise((resolve) => {
      resolve(handler(ctx));
    });
  }

  return next(ctx);
}
