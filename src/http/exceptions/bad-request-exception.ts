import { HttpStatus } from "../mod.ts";
import { HttpException } from "./http-exception.ts";

export class BadRequestException extends HttpException {
  constructor(
    public message: string = "Bad Request Error",
  ) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
