import { assertArrayIncludes, assertEquals } from "./deps_tests.ts";
import { BooleanSchema } from "../mod.ts";

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

  assertArrayIncludes(isBoolean.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(isBoolean.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(isBoolean.validate("").errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate("Cargo").errors, [notBooleanMessage]);

  assertArrayIncludes(isBoolean.validate(-1).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(1).errors, [notBooleanMessage]);

  assertArrayIncludes(isBoolean.validate(NaN).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(Infinity).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(-Infinity).errors, [
    notBooleanMessage,
  ]);

  assertEquals(isBoolean.validate(true).errors, []);
  assertEquals(isBoolean.validate(false).errors, []);

  assertArrayIncludes(isBoolean.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(isBoolean.validate(() => {}).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'required'", () => {
  const bool = new BooleanSchema().optional().required();

  assertArrayIncludes(bool.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(bool.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(bool.validate("").errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate("Cargo").errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(-1).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(1).errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(NaN).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(Infinity).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(-Infinity).errors, [notBooleanMessage]);

  assertEquals(bool.validate(true).errors, []);
  assertEquals(bool.validate(false).errors, []);

  assertArrayIncludes(bool.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(() => {}).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'optional'", () => {
  const bool = new BooleanSchema().optional();

  assertEquals(bool.validate(undefined).errors, []);
  assertEquals(bool.validate(null).errors, []);

  assertArrayIncludes(bool.validate("").errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate("Cargo").errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(-1).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(0).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(1).errors, [notBooleanMessage]);

  assertArrayIncludes(bool.validate(NaN).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(Infinity).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(-Infinity).errors, [notBooleanMessage]);

  assertEquals(bool.validate(true).errors, []);
  assertEquals(bool.validate(false).errors, []);

  assertArrayIncludes(bool.validate({}).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate([]).errors, [notBooleanMessage]);
  assertArrayIncludes(bool.validate(() => {}).errors, [notBooleanMessage]);
});

Deno.test("Boolean Schema Validation: 'true'", () => {
  const boolTrue = new BooleanSchema().true();

  assertArrayIncludes(boolTrue.validate(undefined).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(null).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate("").errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate("Cargo").errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate(-1).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(0).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(1).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate(NaN).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(Infinity).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(-Infinity).errors, [notTrueMessage]);

  assertEquals(boolTrue.validate(true).errors, []);
  assertArrayIncludes(boolTrue.validate(false).errors, [notTrueMessage]);

  assertArrayIncludes(boolTrue.validate({}).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate([]).errors, [notTrueMessage]);
  assertArrayIncludes(boolTrue.validate(() => {}).errors, [notTrueMessage]);
});

Deno.test("Boolean Schema Validation: 'false'", () => {
  const boolFalse = new BooleanSchema().false();

  assertArrayIncludes(boolFalse.validate(undefined).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(null).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate("").errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate("Cargo").errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate(-1).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(0).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(1).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate(NaN).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(Infinity).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(-Infinity).errors, [notFalseMessage]);

  assertArrayIncludes(boolFalse.validate(true).errors, [notFalseMessage]);
  assertEquals(boolFalse.validate(false).errors, []);

  assertArrayIncludes(boolFalse.validate({}).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate([]).errors, [notFalseMessage]);
  assertArrayIncludes(boolFalse.validate(() => {}).errors, [notFalseMessage]);
});
