import { bootstrap, Get } from "https://deno.land/x/cargo/core/mod.ts";
import {
  Authenticator,
  CustomStrategy,
} from "https://deno.land/x/cargo/auth/mod.ts";

interface AuthenticatedUser {
  givenName: string;
}

/*
 * 1. Add strategy to the Authenticator
 */
Authenticator.register(
  new CustomStrategy<AuthenticatedUser>((_ctx, { allow, deny }) => {
    const givenName = (<{ message: string }> _ctx.params).message;
    if (givenName === "Daniel") {
      allow({ givenName: "Daniel" });
    } else {
      deny("Not authorized");
    }
  }),
);

/*
 * Register a route
 */
Get("/:message", ({ auth }) => {
  return new Response(`${(<AuthenticatedUser> auth).givenName}`);
})
  /*
   * 3. Protect route with strategy
   */
  .middleware(Authenticator.protectWith("Custom"));

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap()).run();
