import { HttpStatus } from "../http/mod.ts";
import { HttpException } from "./http-exception.ts";

export class InternalServerException extends HttpException {
  constructor(public message: string = "Internal Server Error!") {
    super(HttpStatus.INTERAL_ERROR);
  }
}
