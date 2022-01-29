import { Instructions, Strategy } from "../mod.ts";
import { RequestContext, SearchParams } from "../../http/mod.ts";

interface LocalStrategyQuery extends SearchParams {
  username?: string;
  password?: string;
}

export class LocalStrategy<T> implements Strategy<T> {
  name = "local";

  constructor(
    private handler: (
      ctx: LocalStrategyQuery,
      instructions: Instructions<T>,
    ) => void,
  ) {}

  authenticate(ctx: RequestContext, { allow, deny }: Instructions<T>) {
    const username = (<LocalStrategyQuery> ctx.search)?.username;
    const password = (<LocalStrategyQuery> ctx.search)?.password;

    if (username && password) {
      this.handler({ username, password }, { allow, deny });
    }

    deny('"username" or/and "password" not submitted!');
  }
}
