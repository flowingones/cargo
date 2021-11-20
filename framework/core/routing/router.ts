import { method } from "../request.ts";
import { RequestContext, Route } from "./route.ts";
import { NotFoundException } from "../exceptions/not-found-exception.ts";
import { walkthroughAndHandle } from "../middleware/middleware.ts";

const routes: Route[] = [];

function getRoutes() {
  return routes;
}

function add(toRoute: Route) {
  routes.push(toRoute);
}

function resolve(
  ctx: RequestContext,
): Promise<Response> {
  const route = routes.find((route) => {
    return route.path.test(ctx.request.url) &&
      route.method === method(ctx.request);
  });

  if (!route) {
    throw new NotFoundException();
  }

  ctx.params = route.path.exec(ctx.request.url)?.pathname?.groups;

  return walkthroughAndHandle(ctx, route.chain, route.handler);
}

export const Router = {
  add,
  resolve,
  getRoutes,
};
