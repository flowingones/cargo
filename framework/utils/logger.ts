import { NAME } from "../constants.ts";

export function log(context: string, message: string) {
  console.log(
    `%c(${NAME}) %c${context} %c${message}`,
    "color:#12DC00; font-weight: bold",
    "font-weight: bold",
    "color: inital",
  );
}
