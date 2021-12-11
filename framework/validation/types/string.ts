import { PrimitiveType, ValidationError, Validator } from "../mod.ts";

class StringType extends PrimitiveType {
  constructor() {
    super("string");
    this.property.validators.push(isString);
  }

  empty(): StringType {
    this.property.validators.push(isEmpty);
    return this;
  }

  notEmpty(): StringType {
    this.property.validators.push(isNotEmpty);
    return this;
  }

  equals(to: string): StringType {
    this.property.validators.push(isEquals(to));
    return this;
  }

  notEquals(to: string): StringType {
    this.property.validators.push(isNotEquals(to));
    return this;
  }

  startsWith(needle: string): StringType {
    this.property.validators.push(startsWith(needle));
    return this;
  }

  endsWith(needle: string): StringType {
    this.property.validators.push(endsWith(needle));
    return this;
  }
}

export function String(): StringType {
  return new StringType();
}

function isString(value: unknown): ValidationError | undefined {
  if (!(typeof value === "string")) {
    return {
      message: `"string" is not type "string"`,
    };
  }
}

function isNotEmpty(value: unknown): ValidationError | undefined {
  if (value === undefined || value === null || value === "") {
    return {
      message: `"string" is empty`,
    };
  }
}

function isEmpty(value: unknown): ValidationError | undefined {
  if (value !== "" && value !== undefined && value !== null) {
    return {
      message: `"string" is not empty`,
    };
  }
}

function isEquals(to: string): Validator {
  return (value: unknown) => {
    if (value !== to) {
      return {
        message: `"string" is not equals "${to}"`,
      };
    }
  };
}

function isNotEquals(to: string): Validator {
  return (value: unknown) => {
    if (value === to) {
      return {
        message: `"string" is equals "${to}"`,
      };
    }
  };
}

function startsWith(needle: string): Validator {
  return (value: unknown) => {
    const startsWith = new RegExp(`^${needle}`);
    if (!startsWith.test(<string> value)) {
      return {
        message: `"string" does not start with "${needle}"`,
      };
    }
  };
}

function endsWith(needle: string): Validator {
  const endsWith = new RegExp(`${needle}$`);
  return (value: unknown) => {
    if (!endsWith.test(<string> value)) {
      return {
        message: `"string" does not end with "${needle}"`,
      };
    }
  };
}
