import { BaseSchema } from "inspect/mod.ts";
import { Router } from "./router.ts";
import { Handler, HttpMethod, RouteParams } from "./mod.ts";

import { Middleware, validateBody } from "../middleware/mod.ts";
import { validateSearch } from "../middleware/validate.ts";

interface ValidationOptions {
  body?: BaseSchema<unknown>;
  search?: BaseSchema<unknown>;
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
    if (Array.isArray(middleware)) {
      for (const eachMiddleware of middleware) {
        this.chain.push(eachMiddleware);
      }
    } else {
      this.chain.push(middleware);
    }
    return this;
  }
  validate(options: ValidationOptions): Route {
    if (options.body) {
      this.middleware(validateBody(options.body));
    }
    if (options.search) {
      this.middleware(validateSearch(options.search));
    }
    return this;
  }
}

export function Head(path: string, handler: Handler) {
  return Router.add({
    path,
    method: HttpMethod.HEAD,
    handler,
  });
}

export function Get(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.GET,
    handler,
  });
}

export function Post(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.POST,
    handler,
  });
}

export function Put(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.PUT,
    handler,
  });
}

export function Patch(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.PATCH,
    handler,
  });
}

export function Delete(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.DELETE,
    handler,
  });
}

export function Options(path: string, handler: Handler): Route {
  return Router.add({
    path,
    method: HttpMethod.OPTIONS,
    handler,
  });
}
