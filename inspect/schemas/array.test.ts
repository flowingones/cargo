import { assertArrayIncludes, assertEquals } from "./deps_tests.ts";
import { ArraySchema, StringSchema } from "../mod.ts";

const requiredMessage = { message: `"array" is required` };

const notArrayMessage = { message: `"array" not type "array"` };

Deno.test("Array Schema Validation: 'isArray'", () => {
  const isArray = new ArraySchema(new StringSchema());

  assertArrayIncludes(isArray.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(isArray.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(isArray.validate("").errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate("Cargo").errors, [notArrayMessage]);

  assertArrayIncludes(isArray.validate(-1).errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate(0).errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate(1).errors, [notArrayMessage]);

  assertArrayIncludes(isArray.validate(NaN).errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate(Infinity).errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate(-Infinity).errors, [notArrayMessage]);

  assertArrayIncludes(isArray.validate(true).errors, [notArrayMessage]);
  assertArrayIncludes(isArray.validate(false).errors, [notArrayMessage]);

  assertArrayIncludes(isArray.validate({}).errors, [notArrayMessage]);
  assertEquals(isArray.validate([]).errors, []);
  assertArrayIncludes(isArray.validate(() => {}).errors, [notArrayMessage]);
});

Deno.test("Array Schema Validation: 'required'", () => {
  const required = new ArraySchema(new StringSchema()).optional().required();

  assertArrayIncludes(required.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(required.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(required.validate("").errors, [notArrayMessage]);
  assertArrayIncludes(required.validate("Cargo").errors, [notArrayMessage]);

  assertArrayIncludes(required.validate(-1).errors, [notArrayMessage]);
  assertArrayIncludes(required.validate(0).errors, [notArrayMessage]);
  assertArrayIncludes(required.validate(1).errors, [notArrayMessage]);

  assertArrayIncludes(required.validate(NaN).errors, [notArrayMessage]);
  assertArrayIncludes(required.validate(Infinity).errors, [notArrayMessage]);
  assertArrayIncludes(required.validate(-Infinity).errors, [notArrayMessage]);

  assertArrayIncludes(required.validate(true).errors, [notArrayMessage]);
  assertArrayIncludes(required.validate(false).errors, [notArrayMessage]);

  assertArrayIncludes(required.validate({}).errors, [notArrayMessage]);
  assertEquals(required.validate([]).errors, []);
  assertArrayIncludes(required.validate(() => {}).errors, [notArrayMessage]);
});

Deno.test("Array Schema Validation: 'optional'", () => {
  const optional = new ArraySchema(new StringSchema()).optional();

  assertEquals(optional.validate(undefined).errors, []);
  assertEquals(optional.validate(null).errors, []);

  assertArrayIncludes(optional.validate("").errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate("Cargo").errors, [notArrayMessage]);

  assertArrayIncludes(optional.validate(-1).errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate(0).errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate(1).errors, [notArrayMessage]);

  assertArrayIncludes(optional.validate(NaN).errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate(Infinity).errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate(-Infinity).errors, [notArrayMessage]);

  assertArrayIncludes(optional.validate(true).errors, [notArrayMessage]);
  assertArrayIncludes(optional.validate(false).errors, [notArrayMessage]);

  assertArrayIncludes(optional.validate({}).errors, [notArrayMessage]);
  assertEquals(optional.validate([]).errors, []);
  assertArrayIncludes(optional.validate(() => {}).errors, [notArrayMessage]);
});
