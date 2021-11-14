import { RequestContext } from "../routing/route.ts";
import { Handler } from "../routing/route.ts";

export type Middleware = (
  cxt: RequestContext,
  next: (ctx: RequestContext) => Promise<Response>,
) => Promise<Response>;

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
