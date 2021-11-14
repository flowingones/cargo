import { HttpMethod } from "../shared/http-method.ts";

export function path(request: Request): string {
  return new URL(request.url).pathname;
}

export function method(request: Request): HttpMethod {
  return <HttpMethod> request.method;
}
