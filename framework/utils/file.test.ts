import { assertEquals } from "../../test_deps.ts";

import { extension, name } from "./file.ts";

Deno.test("File utility functions: extension", () => {
  assertEquals("tsx", extension("pages/home.tsx"));
});

Deno.test("File utility functions: name", () => {
  assertEquals("home", name("pages/home.tsx"));
});
