import { assertArrayIncludes, assertEquals } from "./deps_tests.ts";
import { StringSchema } from "../mod.ts";

const requiredMessage = {
  message: '"string" is required',
};
const notStringMessage = {
  message: '"string" is not type "string"',
};

const notEmptyMessage = {
  message: '"string" is empty',
};

const emptyMessage = {
  message: '"string" is not empty',
};

const equalsMessage = {
  message: '"string" is not equals "Cargo"',
};

const notEqualsMessage = {
  message: '"string" is equals "Cargo"',
};

const startsWithMessage = {
  message: `"string" does not start with "Ca"`,
};

const endsWithMessage = {
  message: `"string" does not end with "go"`,
};

Deno.test("String Schema Validation: 'isString'", () => {
  const isString = new StringSchema();

  assertArrayIncludes(isString.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(isString.validate(null).errors, [requiredMessage]);

  assertEquals(isString.validate("").errors, []);
  assertEquals(isString.validate("Cargo").errors, []);

  assertArrayIncludes(isString.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(isString.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(-Infinity).errors, [notStringMessage]);

  assertArrayIncludes(isString.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(isString.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(isString.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'required'", () => {
  const required = new StringSchema().optional().required();

  assertArrayIncludes(required.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(required.validate(null).errors, [requiredMessage]);

  assertEquals(required.validate("").errors, []);
  assertEquals(required.validate("Cargo").errors, []);

  assertArrayIncludes(required.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(required.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(-Infinity).errors, [notStringMessage]);

  assertArrayIncludes(required.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(required.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(required.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(required.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'optional'", () => {
  const optional = new StringSchema().optional();

  assertEquals(optional.validate(undefined).errors, []);
  assertEquals(optional.validate(null).errors, []);

  assertEquals(optional.validate("").errors, []);
  assertEquals(optional.validate("Cargo").errors, []);

  assertArrayIncludes(optional.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(optional.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(-Infinity).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(NaN).errors, [notStringMessage]);

  assertArrayIncludes(optional.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(optional.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(optional.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'notEmpty'", () => {
  const notEmpty = new StringSchema().notEmpty();

  assertArrayIncludes(notEmpty.validate(undefined).errors, [notEmptyMessage]);
  assertArrayIncludes(notEmpty.validate(null).errors, [notEmptyMessage]);

  assertArrayIncludes(notEmpty.validate("").errors, [notEmptyMessage]);
  assertEquals(notEmpty.validate("Cargo").errors, []);

  assertArrayIncludes(notEmpty.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(notEmpty.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(-Infinity).errors, [notStringMessage]);

  assertArrayIncludes(notEmpty.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(notEmpty.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(notEmpty.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'empty'", () => {
  const empty = new StringSchema().empty();

  assertArrayIncludes(empty.validate(undefined).errors, [
    requiredMessage,
    notStringMessage,
  ]);
  assertArrayIncludes(empty.validate(null).errors, [
    requiredMessage,
    notStringMessage,
  ]);

  assertEquals(empty.validate("").errors, []);
  assertArrayIncludes(empty.validate("Cargo").errors, [emptyMessage]);

  assertArrayIncludes(empty.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(empty.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(-Infinity).errors, [notStringMessage]);

  assertArrayIncludes(empty.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(empty.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(empty.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'equals'", () => {
  const equals = new StringSchema().equals("Cargo");

  assertArrayIncludes(equals.validate(undefined).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(null).errors, [equalsMessage]);

  assertArrayIncludes(equals.validate("").errors, [equalsMessage]);
  assertEquals(equals.validate("Cargo").errors, []);

  assertArrayIncludes(equals.validate(-1).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(0).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(1).errors, [equalsMessage]);

  assertArrayIncludes(equals.validate(NaN).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(Infinity).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(-Infinity).errors, [equalsMessage]);

  assertArrayIncludes(equals.validate(true).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(false).errors, [equalsMessage]);

  assertArrayIncludes(equals.validate({}).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate([]).errors, [equalsMessage]);
  assertArrayIncludes(equals.validate(() => {}).errors, [equalsMessage]);
});

Deno.test("String Schema Validation: 'notEquals'", () => {
  const notEquals = new StringSchema().notEquals("Cargo");

  assertArrayIncludes(notEquals.validate(undefined).errors, [
    requiredMessage,
    notStringMessage,
  ]);
  assertArrayIncludes(notEquals.validate(null).errors, [
    requiredMessage,
    notStringMessage,
  ]);

  assertEquals(notEquals.validate("").errors, []);
  assertArrayIncludes(notEquals.validate("Cargo").errors, [notEqualsMessage]);

  assertArrayIncludes(notEquals.validate(-1).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(0).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(1).errors, [notStringMessage]);

  assertArrayIncludes(notEquals.validate(NaN).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(Infinity).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(-Infinity).errors, [notStringMessage]);

  assertArrayIncludes(notEquals.validate(true).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(false).errors, [notStringMessage]);

  assertArrayIncludes(notEquals.validate({}).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate([]).errors, [notStringMessage]);
  assertArrayIncludes(notEquals.validate(() => {}).errors, [notStringMessage]);
});

Deno.test("String Schema Validation: 'startsWith'", () => {
  const startsWith = new StringSchema().startsWith("Ca");

  assertArrayIncludes(startsWith.validate(undefined).errors, [requiredMessage]);
  assertArrayIncludes(startsWith.validate(null).errors, [requiredMessage]);

  assertArrayIncludes(startsWith.validate("").errors, [startsWithMessage]);
  assertEquals(startsWith.validate("Cargo").errors, []);

  assertArrayIncludes(startsWith.validate(-1).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate(0).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate(1).errors, [startsWithMessage]);

  assertArrayIncludes(startsWith.validate(NaN).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate(Infinity).errors, [
    startsWithMessage,
  ]);
  assertArrayIncludes(startsWith.validate(-Infinity).errors, [
    startsWithMessage,
  ]);

  assertArrayIncludes(startsWith.validate(true).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate(false).errors, [startsWithMessage]);

  assertArrayIncludes(startsWith.validate({}).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate([]).errors, [startsWithMessage]);
  assertArrayIncludes(startsWith.validate(() => {}).errors, [
    startsWithMessage,
  ]);
});
Deno.test("String Schema Validation: 'endsWith'", () => {
  const startsWith = new StringSchema().endsWith("go");

  assertArrayIncludes(startsWith.validate(undefined).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(null).errors, [endsWithMessage]);

  assertArrayIncludes(startsWith.validate("").errors, [endsWithMessage]);
  assertEquals(startsWith.validate("Cargo").errors, []);

  assertArrayIncludes(startsWith.validate(-1).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(0).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(1).errors, [endsWithMessage]);

  assertArrayIncludes(startsWith.validate(NaN).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(Infinity).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(-Infinity).errors, [endsWithMessage]);

  assertArrayIncludes(startsWith.validate(true).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(false).errors, [endsWithMessage]);

  assertArrayIncludes(startsWith.validate({}).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate([]).errors, [endsWithMessage]);
  assertArrayIncludes(startsWith.validate(() => {}).errors, [endsWithMessage]);
});
