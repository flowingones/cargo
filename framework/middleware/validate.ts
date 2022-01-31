import { BadRequestException, RequestContext } from "../http/mod.ts";
import { Next } from "./middleware.ts";

import { BaseSchema } from "../deps.ts";

export function validateBody(schema: BaseSchema) {
  return (ctx: RequestContext, next: Next) => {
    const errors = schema.validate(ctx.body, "Request Body").errors;
    if (errors) {
      throw new BadRequestException();
    }
    return next(ctx);
  };
}
