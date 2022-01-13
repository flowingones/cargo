import { NAME } from "../constants.ts";

export function log(context: string, message: string) {
  console.log(
    `${bold(green(NAME))} ${bold(context)} ${message}`,
  );
}

function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`;
}

function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`;
}
