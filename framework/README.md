# Cargo - Deliver data fast, simple and secure!

> This is a first implementation of a framework which supports you in set up
> APIs. In this very first version it allows you to handle incoming http
> requests and process them with middleware on app and route level. Please do
> not use it in production yet!

## How to use

Create a `main.ts` file import the call the Cargo bootstrap function and add
required routes to the Applications:

```ts
// main.ts
import { bootstrap, Get } from "https://deno.land/x/cargo@0.1.0/core/mod.ts";

const App = await bootstrap();

Get("/hello", (ctx) => {
  return new Response("World!");
});

App.run();
```

Run the application with `deno run --allow-net --allow-read main.ts` and open
`http://localhost:8000/hello`

## Routing

You can call the route creation function everywhere in your code. However we do
recommend to add your routes into files in the `routes` directory. All `.ts`
file in this directory are loaded automatically during Cargos bootstrap process.
This approach allows you to organise and manage the routes in 1 single place.

Create a new folder `routes` in your projects root folder and add a new
`index.ts` file

```ts
// routes/index.ts
import { Post } from "https://deno.land/x/cargo@0.1.0/core/mod.ts";

Post("/hello", (ctx) => {
  return new Response("World!");
});
```

After reloading the application with the
`deno run --allow-net --allow-read main.ts` command you will have the post route
available for making requests.

## Middleware

Middleware allows you to do some work before and after the definitive route
handler is called.

A simple example is to log the time for handling our incoming request. In your
`main.ts` add the following middleware:

```ts
// main.ts
import { bootstrap, Get } from "https://deno.land/x/cargo@0.1.0/core/mod.ts";

const App = await bootstrap();

// Middleware on app level
App.link((ctx, next) => {
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

HelloRoute.link((ctx, next) => {
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

Feel free submit issues or reach out to me for any suggestions at
<daniel.steuri@flowingones.ch>
