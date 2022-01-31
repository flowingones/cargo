import { BadRequestException } from "../http/mod.ts";
import { Next } from "./middleware.ts";

import { BaseSchema } from "../deps.ts";

export class ValidationException extends BadRequestException {
  constructor(public error: string[]) {
    super();
  }
}

export function validateBody(schema: BaseSchema) {
  return (ctx: unknown, next: Next) => {
    const errors = schema.validate((<Request> ctx).body, "Request Body").errors;
    if (errors) {
      throw new ValidationException(errors.map((error) => {
        return `${error.message}`;
      }));
    }
  };
}
