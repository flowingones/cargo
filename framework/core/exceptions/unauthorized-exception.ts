import { HttpStatus } from "../../shared/http-status.ts";
import { HttpException } from "./http-exception.ts";

export class UnauthorizedException extends HttpException {
  constructor(public message: string = "Unauthorized") {
    super(HttpStatus.UNAUTHORIZED);
  }
}
