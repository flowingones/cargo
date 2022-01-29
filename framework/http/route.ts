import { Router } from "./router.ts";
import { Handler, HttpMethod, RouteParams } from "./mod.ts";

import { Middleware } from "../middleware/mod.ts";

export class Route {
  path: URLPattern;
  method: HttpMethod;
  handler: Handler;
  chain: Middleware[] = [];

  constructor({ path, method, handler }: RouteParams) {
    this.path = path;
    this.method = method;
    this.handler = handler;
  }

  middleware(middleware: Middleware | Middleware[]): Route {
    if (middleware instanceof Array) {
      for (const eachMiddleware of middleware) {
        this.chain.push(eachMiddleware);
      }
    } else {
      this.chain.push(middleware);
    }
    return this;
  }
}

export function Get(path: string, handler: Handler) {
  const route = new Route({
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.GET,
    handler: handler,
  });
  Router.add(route);
  return route;
}

export function Post(path: string, handler: Handler) {
  const route = new Route({
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.POST,
    handler: handler,
  });
  Router.add(route);
  return route;
}

export function Put(path: string, handler: Handler) {
  const route = new Route({
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.PUT,
    handler: handler,
  });
  Router.add(route);
  return route;
}

export function Patch(path: string, handler: Handler) {
  const route = new Route({
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.PATCH,
    handler: handler,
  });
  Router.add(route);
  return route;
}

export function Delete(path: string, handler: Handler) {
  const route = new Route({
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.DELETE,
    handler: handler,
  });
  Router.add(route);
  return route;
}
