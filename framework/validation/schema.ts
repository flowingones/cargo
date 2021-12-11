export type Validator = (
  value: unknown,
  key?: string,
) => ValidationError | undefined;

export interface Validation {
  value: unknown;
  errors: ValidationError[];
}

export interface ValidationError {
  key?: string;
  message: string;
}

export interface Property {
  validators: Validator[];
  isRequired: boolean;
}

export abstract class BaseType {
  property: Property = {
    validators: [],
    isRequired: true,
  };

  optional(): this {
    this.property.isRequired = false;
    return this;
  }

  abstract required(): this;

  abstract validate(key: string, value: unknown): Validation;
}

export abstract class PrimitiveType extends BaseType {
  constructor(type: string) {
    super();
    this.property.validators = [required(type)];
  }

  custom(validator: Validator): this {
    this.property.validators.push(validator);
    return this;
  }

  required(): this {
    this.property.isRequired = true;
    return this;
  }

  validate(value: unknown): Validation {
    const errors: ValidationError[] = [];

    if (this.property.isRequired || isDefined(value)) {
      for (const validator of this.property.validators) {
        const result = validator(value);
        if (result) errors.push(result);
      }
    }

    return {
      value,
      errors,
    };
  }
}

function required(type: string): Validator {
  return (value: unknown) => {
    if (isNotDefined(value)) {
      return {
        message: `"${type}" is required`,
      };
    }
  };
}

function isNotDefined(value: unknown): boolean {
  return value === undefined || value === null;
}

function isDefined(value: unknown): boolean {
  return !isNotDefined(value);
}
