import { PrimitiveType, ValidationError } from "../mod.ts";

export class BooleanType extends PrimitiveType {
  constructor() {
    super("boolean");
    this.property.validators.push(isBoolean);
  }

  true(): BooleanType {
    this.property.validators.push(isTrue);
    return this;
  }

  false(): BooleanType {
    this.property.validators.push(isFalse);
    return this;
  }
}

export function Bool(): BooleanType {
  return new BooleanType();
}

function isBoolean(value: unknown): ValidationError | undefined {
  if (!(typeof value === "boolean")) {
    return {
      message: `"boolean" is not type "boolean"`,
    };
  }
}

function isTrue(value: unknown): ValidationError | undefined {
  if (value !== true) {
    return {
      message: `"boolean" is not "true"`,
    };
  }
}

function isFalse(value: unknown): ValidationError | undefined {
  if (value !== false) {
    return {
      message: `"boolean" is not "false"`,
    };
  }
}
