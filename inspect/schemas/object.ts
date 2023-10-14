import {
  BaseSchema,
  isDefined,
  required,
  Schema,
  ValidationError,
} from "../schema.ts";

interface Keyable {
  [key: string]: unknown;
}

interface KeyableSchema {
  [key: string]: Schema<unknown>;
}

type SchemaType<T extends KeyableSchema> = {
  [P in keyof T]: T[P]["type"];
};

export class ObjectSchema<T extends KeyableSchema>
  extends BaseSchema<SchemaType<T>> {
  constructor(private schema: T) {
    super();
    this.validator(required("object")).validator(isObject);
  }

  validate(toValidate: unknown, key?: string) {
    const errors: ValidationError[] = [];

    if (this.property.isRequired || isDefined(toValidate)) {
      for (const validator of this.property.validators) {
        const result = validator(toValidate, key);
        if (result) errors.push(result);
      }
      for (const key in this.schema) {
        const toPush = isDefined(toValidate) && typeof toValidate !== "function"
          ? (<Keyable> toValidate)[key]
          : undefined;
        errors.push(...this.schema[key].validate(toPush, key).errors);
      }
    }

    return {
      value: <SchemaType<T>> toValidate,
      errors,
    };
  }

  required(): this {
    this.property.isRequired = true;
    return this;
  }
}

function isObject(value: unknown, key?: string): ValidationError | undefined {
  if (isValidObject(value)) {
    return;
  }
  return { message: `"${key || "object"}" not type "object"` };
}

function isValidObject(value: unknown) {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}
