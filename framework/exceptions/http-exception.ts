import { HttpStatus } from "../http/mod.ts";

export class HttpException extends Error {
  constructor(public status: HttpStatus) {
    super();
  }
}
