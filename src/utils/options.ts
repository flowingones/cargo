interface Options {
  [key: string]: unknown;
}

export function override(
  toOverride: Options,
  options: Options,
): void {
  for (const option in toOverride) {
    if (options[option] !== undefined && options[option] !== null) {
      toOverride[option] = options[option];
    }
  }
}
