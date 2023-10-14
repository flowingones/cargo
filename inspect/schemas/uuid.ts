import { PrimitiveSchema, ValidationError } from "../schema.ts";

export type Version = "1" | "4" | "all";

const patterns: Record<Version, RegExp> = {
  all: /^[0-9A-Z]{8}(-[0-9A-Z]{4}){3}-[0-9A-Z]{12}$/i,
  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  // 2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  // 3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  // 5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
};

export class UUIDSchema extends PrimitiveSchema<string> {
  constructor(version?: Version) {
    super("uuid");
    this.validator(isUUID(version));
  }
}

function isUUID(
  version?: Version,
) {
  return (value: unknown, key?: string): ValidationError | undefined => {
    if (typeof value === "string" && patterns[version || "all"].test(value)) {
      return;
    }
    return {
      message: `"${key || "string"}" is not a valid "UUID"`,
    };
  };
}
