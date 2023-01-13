import { assertEquals } from "std/testing/asserts.ts";
import { UUIDSchema } from "./uuid.ts";

const notUUIDMessage = '"string" is not a valid "UUID"';
const uuid1 = "ae6ad8ac-78c7-11ed-a1eb-0242ac120002";
const uuid4 = "a05dfb70-7359-45a8-8407-45f509b24258";

Deno.test("UUID Schema Validation: 'isUUID'", async (t) => {
  await t.step("should validated all UUIDs", () => {
    const uuidSchema = new UUIDSchema();
    assertEquals(uuidSchema.validate(uuid1).errors, []);
    assertEquals(uuidSchema.validate(uuid4).errors, []);
    assertEquals(uuidSchema.validate("Cargo").errors, [{
      message: notUUIDMessage,
    }]);
  });

  await t.step("should validated all UUIDs and allow undefined", () => {
    const uuidSchema = new UUIDSchema().optional();
    assertEquals(uuidSchema.validate(undefined).errors, []);
    assertEquals(uuidSchema.validate(uuid1).errors, []);
    assertEquals(uuidSchema.validate(uuid4).errors, []);
    assertEquals(uuidSchema.validate("Cargo").errors, [{
      message: notUUIDMessage,
    }]);
  });

  await t.step("should validated UUID V1", () => {
    const uuidSchema = new UUIDSchema("1");
    assertEquals(uuidSchema.validate(uuid1).errors, []);
    assertEquals(uuidSchema.validate(uuid4).errors, [{
      message: notUUIDMessage,
    }]);
    assertEquals(uuidSchema.validate("Cargo").errors, [{
      message: notUUIDMessage,
    }]);
  });

  await t.step("should validated UUID V4", () => {
    const uuidSchema = new UUIDSchema("4");
    assertEquals(uuidSchema.validate(uuid1).errors, [{
      message: notUUIDMessage,
    }]);
    assertEquals(uuidSchema.validate(uuid4).errors, []);
    assertEquals(uuidSchema.validate("Cargo").errors, [{
      message: notUUIDMessage,
    }]);
  });
});
