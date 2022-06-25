import { getSearchParams, RequestContext } from "../http/mod.ts";

import { Next } from "./middleware.ts";

export function addSearchParamsToContext(ctx: RequestContext, next: Next) {
  ctx.search = getSearchParams(ctx.request);
  return next(ctx);
}
