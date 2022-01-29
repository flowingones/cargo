import { PrimitiveSchema, ValidationError, Validator } from "../mod.ts";

export class NumberSchema extends PrimitiveSchema {
  constructor() {
    super("number");
    this.property.validators.push(isNumber);
  }

  positive(): this {
    this.validator(isPositive);
    return this;
  }

  negative(): this {
    this.validator(isNegative);
    return this;
  }

  equals(to: number): this {
    this.validator(isEquals(to));
    return this;
  }

  min(like: number): this {
    this.validator(isMin(like));
    return this;
  }

  max(like: number): this {
    this.validator(isMax(like));
    return this;
  }
}

export function number(): NumberSchema {
  return new NumberSchema();
}

function isNumber(value: unknown, key?: string): ValidationError | undefined {
  if (isFiniteNumber(value)) {
    return;
  }
  return {
    message: `"${key || "number"}" is not type "number"`,
  };
}

function isPositive(value: unknown, key?: string): ValidationError | undefined {
  if (isFiniteNumber(value) && <number> value >= 1) {
    return;
  }
  return {
    message: `"${key || "number"}" is not positive`,
  };
}

function isNegative(value: unknown, key?: string): ValidationError | undefined {
  if (isFiniteNumber(value) && <number> value < 0) {
    return;
  }
  return {
    message: `"${key || "number"}" is not negative`,
  };
}

function isEquals(to: number): Validator {
  return (value: unknown, key?: string) => {
    if (value === to) {
      return;
    }
    return {
      message: `"${key || "number"}" is not equals ${to}`,
    };
  };
}

function isMin(is: number): Validator {
  return (value: unknown, key?: string) => {
    if (isFiniteNumber(value) && <number> value >= is) {
      return;
    }
    return {
      message: `"${key || "number"}" is smaller than ${is}`,
    };
  };
}

function isMax(is: number): Validator {
  return (value: unknown, key?: string) => {
    if (isFiniteNumber(value) && <number> value <= is) {
      return;
    }
    return {
      message: `"${key || "number"}" is bigger than ${is}`,
    };
  };
}

function isFiniteNumber(value: unknown) {
  if (typeof value !== "number") {
    return false;
  }
  return Number.isFinite(value);
}
