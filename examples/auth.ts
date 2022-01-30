import { bootstrap } from "https://deno.land/x/cargo@0.1.23/mod.ts";
import { Get } from "https://deno.land/x/cargo@0.1.23/http/mod.ts";
import {
  Authenticator,
  LocalStrategy,
} from "https://deno.land/x/cargo@0.1.23/auth/mod.ts";

interface AuthenticatedUser {
  name: string;
}

/*
 * 1. Add strategy to the Authenticator
 */
Authenticator.strategy(
  new LocalStrategy<AuthenticatedUser>((ctx, { allow, deny }) => {
    const username = ctx.username;
    const password = ctx.password;

    if (username === "hello" && password === "world") {
      allow({ name: "John Doe" });
    } else {
      deny("Not authorized");
    }
  }),
);

/*
 * Register a route
 */
Get("/:message", ({ auth }) => {
  return new Response(`${(<AuthenticatedUser> auth).name}`);
})
  /*
   * 3. Protect route with strategy
   */
  .middleware(Authenticator.protectWith("local"));

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap()).run();
