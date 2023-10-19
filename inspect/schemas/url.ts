import { PrimitiveSchema, ValidationError, Validator } from "../schema.ts";

export class URLSchema extends PrimitiveSchema<string> {
  constructor() {
    super("url");
    this.validator(isUrl);
  }

  http(secure = true) {
    this.validator(isHttp(secure));
    return this;
  }

  protocol(protocol: string) {
    this.validator(isProtocol(protocol));
    return this;
  }
}

function isUrl(value: unknown, key?: string): ValidationError | undefined {
  if (url(value) instanceof URL) {
    return;
  }
  return {
    message: `"${key || "url"}" is not a valid "URL"`,
  };
}

function isProtocol(protocol: string): Validator {
  return (value: unknown, key?: string): ValidationError | undefined => {
    if (url(value)?.protocol === protocol) {
      return;
    }
    return {
      message: `"${key || "url"}" is not of protocol type "${protocol}"`,
    };
  };
}

function isHttp(secure: boolean): Validator {
  return (value: unknown, key?: string): ValidationError | undefined => {
    const allowed = secure ? ["https:"] : ["http:", "https:"];
    const protocol = url(value)?.protocol;
    if (protocol && allowed.includes(protocol)) {
      return;
    }
    return {
      message: `"${key || "url"}" is not of protocol type "${
        allowed.join(`" or "`)
      }"`,
    };
  };
}

function url(value: unknown): URL | undefined {
  try {
    return new URL(<string> value);
  } catch {
    return;
  }
}
