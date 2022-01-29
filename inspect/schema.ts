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

export abstract class BaseSchema {
  property: Property = {
    validators: [],
    isRequired: true,
  };

  protected validator(validator: Validator): this {
    this.property.validators.push(validator);
    return this;
  }

  optional(): this {
    this.property.isRequired = false;
    return this;
  }

  abstract required(): this;

  abstract validate(value: unknown, key?: string): Validation;
}

export abstract class PrimitiveSchema extends BaseSchema {
  constructor(type: string) {
    super();
    this.property.validators = [required(type)];
  }

  custom(validator: Validator): this {
    this.validator(validator);
    return this;
  }

  required(): this {
    this.property.isRequired = true;
    return this;
  }

  validate(value: unknown, key?: string): Validation {
    const errors: ValidationError[] = [];

    if (this.property.isRequired || isDefined(value)) {
      for (const validator of this.property.validators) {
        const result = validator(value, key);
        if (result) errors.push(result);
      }
    }

    return {
      value,
      errors,
    };
  }
}

export function required(type: string): Validator {
  return (value: unknown, key?: string) => {
    if (isNotDefined(value)) {
      return {
        message: `"${key || type}" is required`,
      };
    }
  };
}

export function isNotDefined(value: unknown): boolean {
  return value === undefined || value === null;
}

export function isDefined(value: unknown): boolean {
  return !isNotDefined(value);
}
