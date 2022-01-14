import { assertArrayIncludes, assertEquals } from "./deps_tests.ts";
import { ObjectSchema, StringSchema } from "../mod.ts";

const requiredMessage = { message: `"object" is required` };

const notObjectMessage = { message: `"object" not type "object"` };

const nameRequiredMessage = {
  message: '"name" is required',
};

const nameNotStringMessage = {
  message: '"name" is not type "string"',
};

Deno.test("Object Schema Validation: 'isObject'", () => {
  const isObject = new ObjectSchema({
    name: new StringSchema(),
  })
    .optional()
    .required();

  assertArrayIncludes(isObject.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(isObject.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(isObject.validate("").errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate("Cargo").errors, [notObjectMessage]);

  assertArrayIncludes(isObject.validate(-1).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(0).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(1).errors, [notObjectMessage]);

  assertArrayIncludes(isObject.validate(NaN).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(Infinity).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(-Infinity).errors, [notObjectMessage]);

  assertArrayIncludes(isObject.validate(true).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(false).errors, [notObjectMessage]);

  assertEquals(isObject.validate({}).errors, [
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertEquals(
    isObject.validate({
      name: "Cargo",
    }).errors,
    [],
  );
  assertEquals(
    isObject.validate({
      name: "",
    }).errors,
    [],
  );
  assertArrayIncludes(isObject.validate([]).errors, [notObjectMessage]);
  assertArrayIncludes(isObject.validate(() => {}).errors, [notObjectMessage]);
});

Deno.test("Object Schema Validation: 'required'", () => {
  const required = new ObjectSchema({
    name: new StringSchema(),
  });

  assertArrayIncludes(required.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(required.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(required.validate("").errors, [notObjectMessage]);
  assertArrayIncludes(required.validate("Cargo").errors, [notObjectMessage]);

  assertArrayIncludes(required.validate(-1).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(0).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(1).errors, [notObjectMessage]);

  assertArrayIncludes(required.validate(NaN).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(Infinity).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(-Infinity).errors, [notObjectMessage]);

  assertArrayIncludes(required.validate(true).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(false).errors, [notObjectMessage]);

  assertEquals(required.validate({}).errors, [
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertEquals(
    required.validate({
      name: "Cargo",
    }).errors,
    [],
  );
  assertEquals(
    required.validate({
      name: "",
    }).errors,
    [],
  );
  assertArrayIncludes(required.validate([]).errors, [notObjectMessage]);
  assertArrayIncludes(required.validate(() => {}).errors, [notObjectMessage]);
});

Deno.test("Object Schema Validation: 'optional'", () => {
  const optional = new ObjectSchema({
    name: new StringSchema(),
  }).optional();

  assertEquals(optional.validate(undefined).errors, []);
  assertEquals(optional.validate(null).errors, []);

  assertArrayIncludes(optional.validate("").errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate("Cargo").errors, [notObjectMessage]);

  assertArrayIncludes(optional.validate(-1).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(0).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(1).errors, [notObjectMessage]);

  assertArrayIncludes(optional.validate(NaN).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(Infinity).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(-Infinity).errors, [notObjectMessage]);

  assertArrayIncludes(optional.validate(true).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(false).errors, [notObjectMessage]);

  assertEquals(optional.validate({}).errors, [
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertEquals(
    optional.validate({
      name: "Cargo",
    }).errors,
    [],
  );
  assertEquals(
    optional.validate({
      name: "",
    }).errors,
    [],
  );
  assertArrayIncludes(optional.validate([]).errors, [notObjectMessage]);
  assertArrayIncludes(optional.validate(() => {}).errors, [notObjectMessage]);
});
