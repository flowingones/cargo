import { BadRequestException, type RequestContext } from "../http/mod.ts";
import type { Next } from "./middleware.ts";
import type { BaseSchema, ValidationError } from "inspect/mod.ts";

export function validateBody(schema: BaseSchema<unknown>) {
  return (ctx: RequestContext, next: Next) => {
    const errors = schema.validate(ctx.body, "Request Body").errors;
    if (errors.length) {
      throwValidationException(errors);
    }
    return next(ctx);
  };
}

export function validateSearch(schema: BaseSchema<unknown>) {
  return (ctx: RequestContext, next: Next) => {
    const errors = schema.validate(ctx.search, "Search Parameters").errors;
    if (errors.length) {
      throwValidationException(errors);
    }
    return next(ctx);
  };
}

function throwValidationException(errors: ValidationError[]) {
  const exception = new BadRequestException();
  exception.error = errors.map((error) => {
    return `${error.message}`;
  });
  throw exception;
}
