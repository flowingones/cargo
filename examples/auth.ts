import { bootstrap, Get } from "https://deno.land/x/cargo/core/mod.ts";
import { Authenticator, CustomStrategy } from "https://deno.land/x/auth/mod.ts";

interface AuthenticatedUser {
  givenName: string;
}

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

Get("/:message", ({ auth }) => {
  return new Response(`${(<AuthenticatedUser> auth).givenName}`);
}).middleware(Authenticator.protectWith("Custom"));

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap()).run();
