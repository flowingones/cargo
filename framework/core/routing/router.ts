import { NotFoundException } from "../exceptions/not-found.ts";
import { method } from "../request.ts";
import { RequestContext, Route } from "./route.ts";

const routes: Route[] = [];

function getRoutes() {
  return routes;
}

function add(route: Route) {
  routes.push(route);
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

  const handler = route.handler(ctx);
  if (handler instanceof Promise) {
    return handler;
  }
  return new Promise((resolve) => {
    resolve(handler);
  });
}

export const Router = {
  add,
  resolve,
  getRoutes,
};
