import { RequestContext } from "../http/mod.ts";

import { Next } from "./middleware.ts";

export function rawBody(ctx: RequestContext, next: Next) {
  ctx.body = ctx.request.body;
  return next(ctx);
}
