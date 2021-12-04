import {
  bootstrap,
  Get,
  RequestContext,
} from "https://deno.land/x/cargo@0.1.4/core/mod.ts";
import { measure } from "https://deno.land/x/cargo@0.1.4/middleware/mod.ts";

interface MessageParams {
  message: string;
}

Get("/:message", ({ params }) => {
  return new Response(`${(<MessageParams> params).message}`);
}).middleware(measure);

const App = await bootstrap();
App.run();
