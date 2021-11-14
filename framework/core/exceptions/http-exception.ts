import { HttpStatus } from "../../shared/mod.ts";

export class HttpException extends Error {
  constructor(public status: HttpStatus) {
    super("Http Exception");
  }
}
