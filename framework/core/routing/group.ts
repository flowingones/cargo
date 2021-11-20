import { Middleware } from "../middleware/middleware.ts";
import { Route } from "../routing/route.ts";

export class RouteGroup {
  prefix: URLPattern;
  chain: Middleware[] = [];
  routes: Route[] = [];

  link = this.middleware;

  constructor(prefix: string, route?: Route[]) {
    this.prefix = new URLPattern({ pathname: prefix });
    if (route) {
      this.route(route);
    }
  }

  middleware(middleware: Middleware | Middleware[]): RouteGroup {
    if (middleware instanceof Array) {
      for (const eachMiddleware of middleware) {
        this.chain.push(eachMiddleware);
      }
    } else {
      this.chain.push(middleware);
    }
    this.routes.forEach((toRoute) => {
      this.prependMiddleware(toRoute);
    });
    return this;
  }

  route(toRoute: Route | Route[]): RouteGroup {
    if (toRoute instanceof Array) {
      for (const route of toRoute) {
        this.routes.push(this.prepare(route));
      }
    } else {
      this.routes.push(this.prepare(toRoute));
    }
    return this;
  }

  private prepare(toRoute: Route): Route {
    this.prefixRoute(toRoute);
    this.prependMiddleware(toRoute);
    return toRoute;
  }

  private prefixRoute(toRoute: Route): void {
    toRoute.path = new URLPattern({
      pathname: `${this.prefix.pathname}${toRoute.path.pathname}`,
    });
  }

  private prependMiddleware(toRoute: Route): void {
    toRoute.chain = [...this.chain, ...toRoute.chain];
  }
}

export function Group(path?: string, routes?: Route[]): RouteGroup {
  return new RouteGroup(path || "", routes);
}
