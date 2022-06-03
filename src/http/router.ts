import { walkthroughAndHandle } from "../middleware/middleware.ts";
import {
  getUrlParams,
  method,
  NotFoundException,
  RequestContext,
  Route,
} from "./mod.ts";

const routes: Route[] = [];

function getRoutes() {
  return routes;
}

function add(toRoute: Route) {
  routes.push(toRoute);
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
