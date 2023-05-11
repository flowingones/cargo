import { parseBody } from "./body-parser.ts";
import { assertEquals, assertRejects } from "std/testing/asserts.ts";
import { EntityTooLargeException } from "../../http/mod.ts";

const requestOptions = {
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
};

Deno.test("Body Parser:", async (t) => {
  await t.step("parse if body size not exceeds the max size", async () => {
    await parseBody({ maxBodySize: 3 })({
      request: new Request("https://cargo.wtf", {
        ...requestOptions,
        body: '"a"',
      }),
    } as any, (ctx) => {
      assertEquals("a", ctx.body);
      return Promise.resolve(new Response());
    });
  });

  await t.step(
    'reject if body exceededs max size with "EntityTooLargeException"',
    () => {
      assertRejects(
        () => {
          return parseBody({ maxBodySize: 2 })({
            request: new Request("https://cargo.wtf", {
              ...requestOptions,
              body: '"a"',
            }),
          } as any, (_ctx) => {
            return Promise.resolve(new Response());
          });
        },
        EntityTooLargeException,
      );
    },
  );

  await t.step(
    "handle undefined body",
    () => {
      parseBody()({
        request: new Request("https://cargo.wtf", {
          ...requestOptions,
        }),
      } as any, (ctx) => {
        assertEquals(ctx.body, undefined);
        return Promise.resolve(new Response());
      });
    },
  );

  await t.step('"application/json": parse json with body', async () => {
    const json = {
      hello: "world",
    };
    const jsonAsString = JSON.stringify(json);

    await parseBody()({
      request: new Request("https://cargo.wtf", {
        ...requestOptions,
        body: jsonAsString,
      }),
    } as any, (ctx) => {
      assertEquals(json, ctx.body);
      return Promise.resolve(new Response());
    });
  });

  await t.step('"application/json": parse empty json body', async () => {
    const json = "";
    const jsonAsString = JSON.stringify(json);

    await parseBody()({
      request: new Request("https://cargo.wtf", {
        ...requestOptions,
        body: jsonAsString,
      }),
    } as any, (ctx) => {
      assertEquals(json, ctx.body);
      return Promise.resolve(new Response());
    });
  });

  await t.step(
    '"application/json": reject not json string with "SyntaxError"',
    () => {
      const json = "peng";
      assertRejects(
        () => {
          return parseBody()({
            request: new Request("https://cargo.wtf", {
              ...requestOptions,
              body: json,
            }),
          } as any, (_ctx) => {
            return Promise.resolve(new Response());
          });
        },
        SyntaxError,
      );
    },
  );
});
