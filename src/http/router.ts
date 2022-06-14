import { walkthroughAndHandle } from "../middleware/middleware.ts";

import {
  getUrlParams,
  Handler,
  HttpMethod,
  method,
  NotFoundException,
  RequestContext,
  Route,
} from "./mod.ts";

const routes: Route[] = [];

function getRoutes() {
  return routes;
}

function add(
  toRoute: { path: string; method: HttpMethod; handler: Handler },
): Route {
  const route = new Route({
    path: new URLPattern({ pathname: toRoute.path }),
    method: toRoute.method,
    handler: toRoute.handler,
  });
  routes.push(route);
  return route;
}

function resolve(ctx: RequestContext): Promise<Response> {
  const route = routes.find((route) => {
    return (
      route.path.test(ctx.request.url) && route.method === method(ctx.request)
    );
  });

  if (!route) {
    throw new NotFoundException();
  }

  ctx.params = getUrlParams(route, ctx.request);

  return walkthroughAndHandle(ctx, route.chain, route.handler);
}

export const Router = {
  add,
  resolve,
  getRoutes,
};
