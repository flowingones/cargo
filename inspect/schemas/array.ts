import {
  BaseSchema,
  isDefined,
  required,
  Schema,
  Validation,
  ValidationError,
} from "../schema.ts";

export class ArraySchema<T extends Schema<unknown>>
  extends BaseSchema<T["type"][]> {
  constructor(private schema: T) {
    super();
    this.validator(required("array")).validator(isArray);
  }

  validate(toValidate: unknown, key?: string): Validation<T["type"][]> {
    const errors: ValidationError[] = [];

    if (this.property.isRequired || isDefined(toValidate)) {
      for (const validator of this.property.validators) {
        const result = validator(toValidate, key);
        if (result) {
          errors.push(result);
        }
      }
      if (Array.isArray(toValidate)) {
        for (
          const [index, entry] of <IterableIterator<[number, unknown]>> (
            toValidate.entries()
          )
        ) {
          errors.push(
            ...this.schema.validate(entry, `array index ${index.toString()}`)
              .errors,
          );
        }
      }
    }

    return {
      value: <T["type"][]> toValidate,
      errors,
    };
  }

  required(): this {
    this.property.isRequired = true;
    return this;
  }
}

function isArray(value: unknown, key?: string): ValidationError | undefined {
  if (Array.isArray(value)) {
    return;
  }
  return { message: `"${key || "array"}" not type "array"` };
}
