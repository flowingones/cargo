import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { ObjectSchema, StringSchema } from "../../framework/validation/mod.ts";

const requiredMessage = { message: `"object" is required` };

const isObjectMessage = { message: `"object" not type "object"` };

const nameRequiredMessage = {
  message: '"name" is required',
};

const nameNotStringMessage = {
  message: '"name" is not type "string"',
};

Deno.test("Object Schema Validation: 'required'", () => {
  const required = new ObjectSchema({
    name: new StringSchema(),
  })
    .optional()
    .required();
  /*
  assertArrayIncludes(required.validate(1).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(0).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(-1).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);

  assertArrayIncludes(required.validate(undefined).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(null).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);

  assertArrayIncludes(required.validate("").errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate("Cargo").errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);

  assertArrayIncludes(required.validate({}).errors, [
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate([]).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  */
  assertArrayIncludes(required.validate(() => {}).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  /*

  assertArrayIncludes(required.validate(NaN).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(Infinity).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(-Infinity).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(NaN).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);

  assertArrayIncludes(required.validate(true).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  assertArrayIncludes(required.validate(false).errors, [
    isObjectMessage,
    nameRequiredMessage,
    nameNotStringMessage,
  ]);
  */
});
