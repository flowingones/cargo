import { HttpMethod, Route } from "./mod.ts";
import { type ProtocolConnectionInfo } from "../mod.ts";

export type Handler = (cxt: RequestContext) => Promise<Response> | Response;

export type SearchParams = Record<string, string | string[] | undefined>;

export type UrlParams = Record<string, string | undefined>;

export interface RequestContext {
  request: Request;
  connection: ProtocolConnectionInfo;
  params?: UrlParams;
  body?: unknown;
  auth?: unknown;
  search?: SearchParams;
  [key: string]: unknown;
}

export interface RouteParams {
  path: URLPattern;
  method: HttpMethod;
  handler: Handler;
}

export function path(request: Request): string {
  return new URL(request.url).pathname;
}

export function method(request: Request): HttpMethod {
  return <HttpMethod> request.method;
}

export function getSearchParams(request: Request): SearchParams {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const searchEntries = <SearchParams> {};

  for (const key of searchParams.keys()) {
    const searchParam = searchParams.getAll(key);

    searchEntries[key] = searchParam.length <= 1
      ? (searchEntries[key] = searchParam[0])
      : (searchEntries[key] = searchParam);
  }

  return searchEntries;
}

export function getUrlParams(
  route: Route,
  request: Request,
): UrlParams | undefined {
  return route.path.exec(request.url)?.pathname?.groups;
}
