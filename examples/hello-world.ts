import { bootstrap, Get } from "https://deno.land/x/cargo@0.1.4/core/mod.ts";
import { measure } from "https://deno.land/x/cargo/middleware/mod.ts";

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
  .middleware(measure);

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap()).run();
