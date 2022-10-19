import { HttpStatus } from "../mod.ts";
import { HttpException } from "./http-exception.ts";

export class EntityTooLargeException extends HttpException {
  constructor(
    public message: string = "Request Entity Too Large",
  ) {
    super(message, HttpStatus.ENTITY_TOO_LARGE);
  }
}
