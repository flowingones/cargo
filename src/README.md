# Cargo - Develop Web Applications the Way You Like!

Cargo is a web application framework with the right abstraction of helpful
features to build web applications with Deno. It provides you a starting point
and structure for your projects, yet allows flexibility for different needs. You
can focus on developing awesome projects without getting bogged down by the
lower-level details

## How to use Cargo

Create a `app.ts` file, import and call Cargo's bootstrap function and add
required routes to your Applications:

```ts
// main.ts
import { bootstrap, Get } from "https://deno.land/x/cargo/mod.ts";
import { Get } from "https://deno.land/x/cargo/http/mod.ts";

const app = await bootstrap();

Get("/", (ctx) => {
  return new Response("Hello World!");
});

app.run();
```

Run the application with `deno run --allow-net --allow-read main.ts` and open
`http://localhost:8000/hello` in your browser.

## Middleware

Middleware allows you to do some work before and after the final route handler
is called.

A simple example is to log the time for handling an incoming request. In the
`main.ts` add the following code:

```ts
// main.ts
import { bootstrap } from "https://deno.land/x/cargo/mod.ts";
import { Get } from "https://deno.land/x/cargo/http/mod.ts";

const App = await bootstrap();

// Middleware on app level
App.middleware((ctx, next) => {
  const startTime = Date.now();
  // Calling the next function will continue with the middleware chain and wait for the response.
  const response = await next(ctx);
  const endTime = Date.now();
  // Log the time difference before and after calling the next function ms.
  console.log(endTime - startTime);
  return response;
});

const HelloRoute = Get("/hello", (ctx) => {
  return new Response("World!");
});

// Middleware on route level
HelloRoute.middleware((ctx, next) => {
  // Doing work before the request is handled by the route.
  const response = await next(ctx);
  // Doing work after the request is handled by the route.
  return response;
});

App.run();
```

## Licence

MIT License

## Contact

Feel free submit issues here on GitHub or reach out to me for any feedback at
<daniel.steuri@flowingones.ch>
