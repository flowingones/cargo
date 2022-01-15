import { extname } from "../deps.ts";

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

export function getFileExtension(path: string) {
  return extname(path).replace(".", "");
}
