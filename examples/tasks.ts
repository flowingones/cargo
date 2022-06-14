import {
  autoloadAssets,
  autoloadRoutes,
  bootstrap,
  Get,
  timeToResponse,
} from "./deps.ts";

const app = await bootstrap({
  tasks: {
    onBootstrap: [
      autoloadAssets("assets"),
      autoloadRoutes("pages"),
    ],
  },
});

/*
 * 1. Register Route and Request Handler
 */
Get("/", () => {
  /*
   * 2. Return Response
   */
  return new Response(`This is a response!`);
})
  /*
   * 3. Apply middleware functions (optional)
   */
  .middleware(timeToResponse);

/*
 * 4. Bootstrap and Run the Application
 */
app.run();
