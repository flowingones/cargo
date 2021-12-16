import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { BooleanSchema } from "../../framework/validation/mod.ts";

const requiredMessage = {
  message: '"boolean" is required',
};
const notBooleanMessage = {
  message: '"boolean" is not type "boolean"',
};
const notTrueMessage = {
  message: '"boolean" is not "true"',
};
const notFalseMessage = {
  message: '"boolean" is not "false"',
};

Deno.test("Boolean Schema Validation: 'isBoolean'", () => {
  const isBoolean = new BooleanSchema();

  assertEquals(isBoolean.validate(true).errors, []);
  assertEquals(isBoolean.validate(false).errors, []);

  assertArrayIncludes(isBoolean.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(isBoolean.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(isBoolean.validate("").errors, [notBooleanMessage]);

  assertArrayIncludes(isBoolean.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(() => {}).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(NaN).errors, [notBooleanMessage]);

  assertArrayIncludes(isBoolean.validate(1).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(-1).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'required'", () => {
  const bool = new BooleanSchema().optional().required();

  assertEquals(bool.validate(true).errors, []);
  assertEquals(bool.validate(false).errors, []);

  assertArrayIncludes(bool.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(bool.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(bool.validate("").errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(() => {}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(NaN).errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(1).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(-1).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'optional'", () => {
  const bool = new BooleanSchema().optional();

  assertEquals(bool.validate(true).errors, []);
  assertEquals(bool.validate(false).errors, []);

  assertEquals(bool.validate(undefined).errors, []);
  assertEquals(bool.validate(null).errors, []);

  assertArrayIncludes(bool.validate("").errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(() => {}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(NaN).errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(1).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(-1).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'true'", () => {
  const boolTrue = new BooleanSchema().true();
  assertEquals(boolTrue.validate(true).errors, []);
  assertArrayIncludes(boolTrue.validate(false).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate(undefined).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(null).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate({}).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate([]).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(() => {}).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(NaN).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate(1).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(0).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(-1).errors, [notTrueMessage]);
});

Deno.test("Boolean Schema Validation: 'false'", () => {
  const boolFalse = new BooleanSchema().false();
  assertEquals(boolFalse.validate(false).errors, []);
  assertArrayIncludes(boolFalse.validate(true).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate(undefined).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(null).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate({}).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate([]).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(() => {}).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(NaN).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate(1).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(0).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(-1).errors, [notFalseMessage]);
});
