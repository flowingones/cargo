import { HttpException } from "./http-exception.ts";
import { HttpStatus } from "../http/http-status.ts";

export function handleException(exception: unknown): Response {
  let body: HttpException = {
    name: "Http Exception",
    message: "Internal Server Error",
    status: HttpStatus.INTERAL_ERROR,
  };
  if (exception instanceof HttpException) {
    body = {
      name: (exception as HttpException).name,
      message: (exception as HttpException).message,
      status: (exception as HttpException).status,
    };
  }
  console.error(exception);
  return new Response(JSON.stringify(body), { status: body.status });
}
