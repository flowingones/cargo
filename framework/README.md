# Cargo - Deliver data fast, simple and secure!

> This is a first implementation of a framework which supports you in setting up
> APIs. In the first version it allows you to handle incoming http requests and
> process them with middleware, on app and route level. Please do not use it in
> production yet!

## How to use

Create a `main.ts` file, import and call Cargos bootstrap function and add
required routes to the Applications:

```ts
// main.ts
import { bootstrap, Get } from "https://deno.land/x/cargo/mod.ts";
import { Get } from "https://deno.land/x/cargo/http/mod.ts";

const App = await bootstrap();

Get("/hello", (ctx) => {
  return new Response("World!");
});

App.run();
```

Run the application with `deno run --allow-net --allow-read main.ts` and open
`http://localhost:8000/hello` in your browser.

## Routing

You can call the route creation functions (`Get()`, `Post()` `Put()`, `Patch()`,
`Delete()`) everywhere in your code. However we do recommend to add your routes
into files in the `routes` folder. All `.ts` file in this folder are loaded
automatically during Cargos bootstrap process. This approach allows you to
organise and manage the routes in 1 single place.

Create a new folder `routes` in your projects root folder and add a new
`index.ts` file

```ts
// routes/index.ts
import { Post } from "https://deno.land/x/cargo/http/mod.ts";

Post("/hello", (ctx) => {
  return new Response("World!");
});
```

After reloading the application with the
`deno run --allow-net --allow-read main.ts` command, you are able to do post
request to the new route.

## Middleware

Middleware allows you to do some work before and after the definitive route
handler is called.

A simple example is to log the time for handling our incoming request. In the
`main.ts` add the following middleware:

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

## Roadmap

### Dependency Injection

- Implement simple solution for Dependency Injection. The first implementation
  will follow a functional approach. Since `Decorators` are still a stage 2
  proposal and not implemented in Javascript and Typescript, we wait with a
  decorator based solution.
- Possibility to inject an instance of a class including its dependencies.
- Possibility to inject a function including its dependencies.
- Possibility to add a custom value based on an injection token.

### Middleware

- Implement body-parser middleware with plug-in functionality to add custom
  parser.

### Authentication

- Implement robust and extensible authentication framework.
- Implement first authentication strategies (Basic, JWT, OAuth).

### Documentation

- Create basic structure for getting started and fundamentals.
- Documentation of request context
- Documentation of recommended projects structure.
- Documentation of http routing.
- Documentation of dependency injection.
- Documentation of authentication framework
- Documentation of schema validator
- Use cases and deployment

### Website

- Provide quick overview over the Cargo ecosystem.

### Security

- First audit

## Licence

MIT License

## Contact

Feel free submit issues or reach out to me for any suggestions at
<daniel.steuri@flowingones.ch>
