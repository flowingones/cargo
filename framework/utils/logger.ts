import { NAME } from "../constants.ts";

export function log(context: string, message: string) {
  console.log(
    `${bold(date(new Date()))} ${bold(green(NAME))} ${
      bold(context)
    } ${message}`,
  );
}

export function info(context: string, message: string) {
  console.info(
    `${bold(date(new Date()))} ${bold(yellow(NAME))} ${
      bold(context)
    } ${message}`,
  );
}

function yellow(text: string) {
  return `\x1b[33m${text}\x1b[0m`;
}

function green(text: string) {
  return `\x1b[32m${text}\x1b[0m`;
}

function bold(text: string) {
  return `\x1b[1m${text}\x1b[0m`;
}

function date(date: Date): string {
  return `${doubleDigits(date.getDate())}.${
    doubleDigits(date.getMonth() + 1)
  }.${doubleDigits(date.getFullYear())} ${time(date)}`;
}

function time(date: Date): string {
  return `${doubleDigits(date.getHours())}:${doubleDigits(date.getMinutes())}:${
    doubleDigits(date.getSeconds())
  }`;
}

function doubleDigits(number: number): string {
  const str = number.toString();
  if (str.length === 1) {
    return `0${str}`;
  }
  return str;
}
