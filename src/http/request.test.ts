import { assertEquals } from "../../test_deps.ts";

import { getSearchParams } from "./request.ts";

Deno.test("Request Helper:", async (t) => {
  await t.step("Search param: ref=https:cargo.wtf", () => {
    assertEquals(
      getSearchParams(
        new Request("https://cargo.org?ref=https://cargo.wtf", {
          method: "GET",
        }),
      ),
      {
        ref: "https://cargo.wtf",
      },
    );
  });
});
