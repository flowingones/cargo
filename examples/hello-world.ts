import { bootstrap } from "https://deno.land/x/cargo@0.1.25/mod.ts";
import { Get, UrlParams } from "https://deno.land/x/cargo@0.1.25/http/mod.ts";
import { timeToResponse } from "https://deno.land/x/cargo@0.1.25/middleware/mod.ts";

interface MessageParams extends UrlParams {
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
