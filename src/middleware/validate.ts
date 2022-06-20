import { BadRequestException, RequestContext } from "../http/mod.ts";
import { Next } from "./middleware.ts";

import { BaseSchema } from "../../inspect/schema.ts";

export function validateBody(schema: BaseSchema) {
  return (ctx: RequestContext, next: Next) => {
    const errors = schema.validate(ctx.body, "Request Body").errors;
    if (errors.length) {
      const exception = new BadRequestException();
      exception.error = errors.map((error) => {
        return `${error.message}`;
      });
      throw exception;
    }
    return next(ctx);
  };
}
