import { log } from "../utils/mod.ts";
import { RequestContext } from "../http/mod.ts";

export async function logTimeToResponse(
  ctx: RequestContext,
  next: (ctx: RequestContext) => Promise<Response>,
) {
  // Start time tracking and handle the request.
  const startTime = Date.now();
  const response = await next(ctx);

  // Stop time tracking and log the time.
  const stopTime = Date.now();
  log(
    "REQUEST",
    `Request to route ${ctx.request.url} took ${stopTime - startTime}ms`,
  );
  return response;
}
