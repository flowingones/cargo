import { Middleware } from "../middleware/middleware.ts";
import { Route } from "../routing/route.ts";

export class RouteGroup {
  path?: URLPattern;
  chain: Middleware[] = [];
  routes: Route[] = [];

  constructor(path: string) {
    this.path = new URLPattern({ pathname: path });
  }

  link(middleware: Middleware | Middleware[]): RouteGroup {
    if (middleware instanceof Array) {
      for (const eachMiddleware of middleware) {
        this.chain.push(eachMiddleware);
      }
    } else {
      this.chain.push(middleware);
    }
    return this;
  }

  route(routes: Route | Route[]): RouteGroup {
    if (routes instanceof Array) {
      for (const route of routes) {
        this.routes.push(route);
      }
    } else {
      this.routes.push(routes);
    }
    return this;
  }
}

export function Group(path: string): RouteGroup {
  return new RouteGroup(path);
}
