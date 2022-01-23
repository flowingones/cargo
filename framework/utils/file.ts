import { parse } from "../deps.ts";

export async function isDirectory(path: string): Promise<boolean> {
  try {
    if ((await Deno.lstat(path)).isDirectory) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function extension(path: string) {
  return parse(path).ext.replace(".", "");
}

export function name(path: string): string {
  return parse(path).name;
}
