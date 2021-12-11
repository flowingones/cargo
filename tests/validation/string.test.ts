import { assertArrayIncludes, assertEquals } from "../deps.ts";
import { String } from "../../framework/validation/mod.ts";

const expectedWithEmptyTypes = [
  {
    message: '"string" is required',
  },
  {
    message: '"string" is not type "string"',
  },
];

Deno.test("StringType Valdation: 'undefined, null, \"\"'", () => {
  const isString = String();

  const expectedWithEmptyString: unknown[] = [];

  assertEquals(isString.validate(undefined).errors, expectedWithEmptyTypes);
  assertEquals(isString.validate(null).errors, expectedWithEmptyTypes);
  assertEquals(isString.validate("").errors, expectedWithEmptyString);

  isString.optional();

  assertEquals(isString.validate(undefined).errors, []);
  assertEquals(isString.validate(null).errors, []);
  assertEquals(isString.validate("").errors, expectedWithEmptyString);
});

Deno.test(
  "StringType Valdation: 'object, array, regex, function, numbers'",
  () => {
    const isString = String();
    const expectedWithVariousTypes = [
      {
        message: '"string" is not type "string"',
      },
    ];

    assertEquals(isString.validate({}).errors, expectedWithVariousTypes);
    assertEquals(isString.validate([]).errors, expectedWithVariousTypes);
    assertEquals(isString.validate(/[A-Z]/).errors, expectedWithVariousTypes);
    assertEquals(isString.validate(() => {}).errors, expectedWithVariousTypes);

    assertEquals(isString.validate(-1).errors, expectedWithVariousTypes);
    assertEquals(isString.validate(0).errors, expectedWithVariousTypes);
    assertEquals(isString.validate(1).errors, expectedWithVariousTypes);
  },
);

Deno.test("StringType Valdation: 'String (Cargo)'", () => {
  const isString = String();

  assertEquals(isString.validate("Hello World!").errors, []);
});

Deno.test("StringType Valdation: 'Not Empty'", () => {
  const notEmtpy = String().notEmpty();

  assertEquals(notEmtpy.validate("Cargo").errors, []);
  assertArrayIncludes(notEmtpy.validate("").errors, [
    {
      message: '"string" is empty',
    },
  ]);
  assertArrayIncludes(notEmtpy.validate(undefined).errors, [
    {
      message: '"string" is empty',
    },
  ]);
  assertArrayIncludes(notEmtpy.validate(null).errors, [
    {
      message: '"string" is empty',
    },
  ]);
});

Deno.test("StringType Valdation: 'Empty'", () => {
  const notEmtpy = String().empty();

  assertEquals(notEmtpy.validate("").errors, []);
  assertArrayIncludes(notEmtpy.validate("Cargo").errors, [
    {
      message: '"string" is not empty',
    },
  ]);
});

Deno.test("StringType Valdation: 'Equals'", () => {
  const equals = String().equals("Cargo");
  assertEquals(equals.validate("Cargo").errors, []);
  assertArrayIncludes(equals.validate("Deno").errors, [
    {
      message: '"string" is not equals "Cargo"',
    },
  ]);
  assertArrayIncludes(equals.validate(undefined).errors, [
    {
      message: '"string" is not equals "Cargo"',
    },
  ]);
});

Deno.test("StringType Valdation: 'Not Equals'", () => {
  const notEquals = String().notEquals("Cargo");
  assertEquals(notEquals.validate("Cargo").errors, [
    {
      message: '"string" is equals "Cargo"',
    },
  ]);
  assertArrayIncludes(notEquals.validate("Deno").errors, []);
  assertArrayIncludes(
    notEquals.validate(undefined).errors,
    expectedWithEmptyTypes,
  );
});

Deno.test("StringType Valdation: 'Starts With'", () => {
  const startsWith = String().startsWith("Ca");
  assertEquals(startsWith.validate("Cargo").errors, []);
  assertEquals(startsWith.validate(".").errors, [
    { message: '"string" does not start with "Ca"' },
  ]);
  assertArrayIncludes(startsWith.validate("Deno").errors, [
    { message: '"string" does not start with "Ca"' },
  ]);
  assertArrayIncludes(startsWith.validate({ startsWith: true }).errors, [
    { message: '"string" does not start with "Ca"' },
  ]);
  assertArrayIncludes(startsWith.validate(undefined).errors, [
    { message: '"string" does not start with "Ca"' },
  ]);
});

Deno.test("StringType Valdation: 'Ends With'", () => {
  const endsWith = String().endsWith("go");
  assertEquals(endsWith.validate("Cargo").errors, []);
  assertArrayIncludes(endsWith.validate("Deno").errors, [
    {
      message: '"string" does not end with "go"',
    },
  ]);
  assertArrayIncludes(endsWith.validate(".").errors, [
    {
      message: '"string" does not end with "go"',
    },
  ]);
  assertArrayIncludes(endsWith.validate(undefined).errors, [
    {
      message: '"string" does not end with "go"',
    },
  ]);
});
