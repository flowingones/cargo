import { Instructions, Strategy } from "../mod.ts";
import { RequestContext } from "../../http/mod.ts";

export class CustomStrategy<T> implements Strategy<T> {
  name = "custom";

  constructor(
    private handler: (
      ctx: RequestContext,
      instructions: Instructions<T>,
    ) => void,
  ) {}

  authenticate(ctx: RequestContext, { allow, deny }: Instructions<T>) {
    this.handler(ctx, { allow, deny });
  }
}
