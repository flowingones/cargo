import { HttpStatus } from "../mod.ts";
import { HttpException } from "./http-exception.ts";

export class NotFoundException extends HttpException {
  constructor(public message: string = "Not found") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
