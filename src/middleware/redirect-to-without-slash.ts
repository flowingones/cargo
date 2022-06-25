import { Next } from "./middleware.ts";

export async function redirectToWithoutSlash(
  ctx: { request: Request },
  next: Next,
) {
  const url = new URL(ctx.request.url);
  if (url.pathname.at(-1) === "/" && url.pathname !== "/") {
    return Response.redirect(ctx.request.url.replace(/\/$/, ""));
  }
  return await next(ctx);
}
