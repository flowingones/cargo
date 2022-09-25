import { HttpStatus } from "../mod.ts";
import { HttpException } from "./http-exception.ts";

export class InternalServerException extends HttpException {
  constructor(
    public message: string = "Internal Server Error",
  ) {
    super(message, HttpStatus.INTERAL_ERROR);
  }
}
