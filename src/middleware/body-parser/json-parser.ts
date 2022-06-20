import { Parser } from "./body-parser.ts";

export const JSONParser: Parser<string> = {
  mimeType: "application/json",
  parse: (buffer: Uint8Array) => {
    return JSON.parse(new TextDecoder().decode(buffer));
  },
};
