import { assert } from "std/testing/asserts.ts";
import { isEnvironment, isProd } from "./environment.ts";

Deno.test("idProd flag", async (t) => {
  await t.step("should return false", () => {
    Deno.env.set("CARGO_ENV", "STAGING");
    assert(!isProd());
  });

  await t.step("should return true", () => {
    Deno.env.set("CARGO_ENV", "PROD");
    assert(isProd());
  });
});

Deno.test(isEnvironment.name, async (t) => {
  await t.step("should return true", () => {
    assert(isEnvironment("PROD"));
  });
  await t.step("should return false", () => {
    assert(!isEnvironment("STAGING"));
  });
  await t.step("should return true", () => {
    Deno.env.set("CARGO_ENV", "STAGING");
    assert(isEnvironment("STAGING"));
  });
  await t.step("should return false", () => {
    assert(!isEnvironment("PROD"));
  });
});
