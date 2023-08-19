import { bootstrap, Get, logTimeToResponse, UrlParams } from "./deps.ts";

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
  .middleware(logTimeToResponse);

/*
 * 4. Bootstrap and Run the Application
 */
(await bootstrap({ defaultProtocolOptions: { legacyServe: false } })).run();
