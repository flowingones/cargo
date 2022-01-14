import { PrimitiveSchema, ValidationError, Validator } from "../mod.ts";

export class StringSchema extends PrimitiveSchema {
  constructor() {
    super("string");
    this.validator(isString);
  }

  empty(): this {
    this.validator(isEmpty);
    return this;
  }

  notEmpty(): this {
    this.validator(isNotEmpty);
    return this;
  }

  equals(to: string): this {
    this.validator(isEquals(to));
    return this;
  }

  notEquals(to: string): this {
    this.validator(isNotEquals(to));
    return this;
  }

  startsWith(needle: string): this {
    this.validator(startsWith(needle));
    return this;
  }

  endsWith(needle: string): this {
    this.validator(endsWith(needle));
    return this;
  }
}

function isString(value: unknown, key?: string): ValidationError | undefined {
  if (typeof value === "string") {
    return;
  }
  return {
    message: `"${key || "string"}" is not type "string"`,
  };
}

function isNotEmpty(value: unknown, key?: string): ValidationError | undefined {
  if (value !== undefined && value !== null && value !== "") {
    return;
  }
  return {
    message: `"${key || "string"}" is empty`,
  };
}

function isEmpty(value: unknown, key?: string): ValidationError | undefined {
  if (value === "" || value === undefined || value === null) {
    return;
  }
  return {
    message: `"${key || "string"}" is not empty`,
  };
}

function isEquals(to: string): Validator {
  return (value: unknown, key?: string) => {
    if (value === to) {
      return;
    }
    return {
      message: `"${key || "string"}" is not equals "${to}"`,
    };
  };
}

function isNotEquals(to: string): Validator {
  return (value: unknown, key?: string) => {
    if (value !== to) {
      return;
    }
    return {
      message: `"${key || "string"}" is equals "${to}"`,
    };
  };
}

function startsWith(needle: string): Validator {
  return (value: unknown, key?: string) => {
    const startsWith = new RegExp(`^${needle}`);
    if (startsWith.test(<string> value)) {
      return;
    }
    return {
      message: `"${key || "string"}" does not start with "${needle}"`,
    };
  };
}

function endsWith(needle: string): Validator {
  const endsWith = new RegExp(`${needle}$`);
  return (value: unknown, key?: string) => {
    if (endsWith.test(<string> value)) {
      return;
    }
    return {
      message: `"${key || "string"}" does not end with "${needle}"`,
    };
  };
}
