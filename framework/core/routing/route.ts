import { Router } from "./router.ts";
import { log } from "../../shared/logger.ts";
import { HttpMethod } from "../../shared/http-method.ts";

const CONTEXT = "ROUTE";

export type Handler = (cxt: RequestContext) => Promise<Response> | Response;

export interface RequestContext {
  params?: unknown;
  body?: unknown;
  request: Request;
  response: Response;
}

export interface Route {
  path: URLPattern;
  method: HttpMethod;
  handler: Handler;
}

function get(path: string, handler: Handler) {
  const route = {
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.GET,
    handler: handler,
  };
  Router.add(route);
  logRegisteredRoute(path, HttpMethod.GET);
  return route;
}

function post(
  path: string,
  handler: Handler,
) {
  const route: Route = {
    path: new URLPattern({ pathname: path }),
    method: HttpMethod.POST,
    handler: handler,
  };
  Router.add(route);
  logRegisteredRoute(path, HttpMethod.POST);
  return route;
}

export const Route = {
  get,
  post,
};

function logRegisteredRoute(route: string, method: HttpMethod) {
  log(
    CONTEXT,
    `${method} ${route}`,
  );
}
