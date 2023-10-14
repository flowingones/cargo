export type Validator = (
  value: unknown,
  key?: string,
) => ValidationError | undefined;

export interface Validation<T> {
  value: T;
  errors: ValidationError[];
}

export interface ValidationError {
  message: string;
}

export interface Property {
  validators: Validator[];
  isRequired: boolean;
}

type OptionalType<T extends Schema<unknown>> =
  & Omit<T, "type">
  & Partial<Pick<T, "type">>;

export interface Schema<T> {
  validate(value: unknown, key?: string): Validation<T>;
  type?: T;
}

export abstract class BaseSchema<T> implements Schema<T> {
  property: Property = {
    validators: [],
    isRequired: true,
  };

  type!: T;

  protected validator(validator: Validator): this {
    this.property.validators.push(validator);
    return this;
  }

  optional(): OptionalType<this> {
    this.property.isRequired = false;
    return this;
  }

  abstract required(): this;

  abstract validate(value: unknown, key?: string): Validation<T>;
}

export abstract class PrimitiveSchema<T> extends BaseSchema<T> {
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

  validate(value: unknown, key?: string): Validation<T> {
    const errors: ValidationError[] = [];

    if (this.property.isRequired || isDefined(value)) {
      for (const validator of this.property.validators) {
        const result = validator(value, key);
        if (result) errors.push(result);
      }
    }

    return {
      value: <T> value,
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
