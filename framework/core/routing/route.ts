import { Router } from "./router.ts";
import { HttpMethod } from "../../shared/http-method.ts";
import { Middleware } from "../middleware/middleware.ts";

export type Handler = (cxt: RequestContext) => Promise<Response> | Response;

export interface RequestContext {
  params?: unknown;
  body?: unknown;
  request: Request;
  auth?: unknown;
}

export interface RouteParams {
  path: URLPattern;
  method: HttpMethod;
  handler: Handler;
}

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
