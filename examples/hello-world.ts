import { bootstrap } from "https://deno.land/x/cargo/mod.ts";
import { Get, UrlParams } from "https://deno.land/x/cargo/http/mod.ts";
import { timeToResponse } from "https://deno.land/x/cargo/middleware/mod.ts";

interface MessageParams {
  message: string;
}

/*
 * 1. Register Route and Request Handler
 */
Get("/:message", ({ params }) => {
  /*
   * 2. Return Response
   */
  return new Response(`${(<MessageParams> params).message}`);
})
  /*
   * 3. Apply middleware functions (optional)
   */
  .middleware(timeToResponse);

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap()).run();
