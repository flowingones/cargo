import { HttpStatus } from "../../shared/http-status.ts";
import { HttpException } from "./http-exception.ts";

export class NotFoundException extends HttpException {
  constructor(public message: string = "Not found!") {
    super(HttpStatus.NOT_FOUND);
  }
}
