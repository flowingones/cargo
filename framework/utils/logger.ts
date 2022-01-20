import { NAME } from "../constants.ts";

export function log(context: string, message: string) {
  console.log(
    `${bold(date(new Date()))} ${bold(green(NAME))} ${
      bold(context)
    } ${message}`,
  );
}

function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`;
}

function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`;
}

function date(date: Date): string {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${
    time(date)
  }`;
}

function time(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
