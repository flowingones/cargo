const CARGO_ENV = "CARGO_ENV";

export function isProd(): boolean {
  return Deno.env.get(CARGO_ENV) === "PROD";
}

export function isEnvironment(name: string): boolean {
  return Deno.env.get(CARGO_ENV) === name;
}
