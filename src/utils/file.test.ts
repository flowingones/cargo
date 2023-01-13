import { assertEquals } from "std/testing/asserts.ts";

import { base, extension } from "./file.ts";

Deno.test("File utility functions: extension", () => {
  assertEquals("tsx", extension("pages/home.tsx"));
});

Deno.test("File utility functions: base", () => {
  assertEquals("home", base("pages/home.tsx"));
});
