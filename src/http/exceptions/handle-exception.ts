import { HttpException } from "./http-exception.ts";
import { HttpStatus } from "../http-status.ts";

interface ExceptionBody {
  status: HttpStatus;
  message: string;
  error?: string | string[];
}

export function handleException(exception: unknown): Response {
  let body: ExceptionBody = {
    status: HttpStatus.INTERAL_ERROR,
    message: "Internal Server Error",
  };
  if (exception instanceof HttpException) {
    body = {
      message: (<HttpException> exception).message,
      status: (<HttpException> exception).status,
      error: (<HttpException> exception).error,
    };
  }
  console.error(exception);

  return Response.json(body);
}
