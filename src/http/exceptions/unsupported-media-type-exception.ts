import { HttpStatus } from "../http-status.ts";
import { HttpException } from "./http-exception.ts";

export class UnsupportedMediaTypeException extends HttpException {
  constructor(
    public message: string = "Unsupported Media Type",
  ) {
    super(message, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
  }
}
