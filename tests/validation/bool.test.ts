import { assertEquals } from "../deps.ts";
import { Bool } from "../../framework/validation/mod.ts";

Deno.test("BoolType Valdation: 'null, undefined'", () => {
  const bool = Bool().required();
  const expectedWithEmptyTypes = [
    {
      message: '"boolean" is required',
    },
    {
      message: '"boolean" is not type "boolean"',
    },
  ];

  assertEquals(expectedWithEmptyTypes, bool.validate(undefined).errors);
  assertEquals(expectedWithEmptyTypes, bool.validate(null).errors);
  assertEquals(
    [{ message: '"boolean" is not type "boolean"' }],
    bool.validate("").errors,
  );
});

Deno.test(
  "BooleanType Valdation: 'object, array, regex, function, numbers'",
  () => {
    const isBoolean = Bool();
    const expectedWithVariousTypes = [
      {
        message: '"boolean" is not type "boolean"',
      },
    ];

    assertEquals(expectedWithVariousTypes, isBoolean.validate({}).errors);
    assertEquals(expectedWithVariousTypes, isBoolean.validate([]).errors);
    assertEquals(expectedWithVariousTypes, isBoolean.validate(/[A-Z]/).errors);
    assertEquals(expectedWithVariousTypes, isBoolean.validate(() => {}).errors);

    assertEquals(expectedWithVariousTypes, isBoolean.validate(-1).errors);
    assertEquals(expectedWithVariousTypes, isBoolean.validate(0).errors);
    assertEquals(expectedWithVariousTypes, isBoolean.validate(1).errors);
  },
);

Deno.test("BoolType Valdation: true, false", () => {
  const boolTrue = Bool().true();
  assertEquals(boolTrue.validate(true).errors, []);

  const boolFalse = Bool().false();
  assertEquals(boolFalse.validate(false).errors, []);

  const optional = Bool().optional();
  assertEquals(optional.validate(undefined).errors, []);
});
