import {
  bootstrap,
  Get,
  RequestContext,
} from "https://deno.land/x/cargo@0.1.2/core/mod.ts";

interface MessageParams {
  message: string;
}

const HelloRoute = Get("/:message", ({ params }) => {
  return new Response(`${(<MessageParams> params).message}`);
});

async function measure(
  ctx: RequestContext,
  next: (ctx: RequestContext) => Promise<Response>,
) {
  // Start time tracking and handle the request.
  const startTime = Date.now();
  const response = await next(ctx);

  // Stop time tracking and log the time.
  const stopTime = Date.now();
  console.log(`Request handled in ${stopTime - startTime} ms`);
  return response;
}
HelloRoute.middleware(measure);

const App = await bootstrap();
App.run();
