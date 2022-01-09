import { extname } from "../deps.ts";
import { registry } from "../components/registry.ts";

/**
 * Function to register parcel files from the default "components" directory or a given path.
 * @function
 * @param {string} [directoryPath] - components
 * @param {string} [namespace] - undefined
 */
export async function parcelFromDir(
  directoryPath = "components",
  namespace?: string,
): Promise<void> {
  const basePath = directoryPath;
  try {
    for await (const file of Deno.readDir(basePath)) {
      if (!file.isDirectory && isParcelFile(file.name)) {
        const content = await readParcelFile(`${basePath}/${file.name}`);
        if (content) {
          registry.add({
            name: file.name,
            content: content,
            namespace: namespace,
          });
        }
      }
      if (file.isDirectory || file.isSymlink) {
        await parcelFromDir(
          `${basePath}/${file.name}`,
          `${namespace ? namespace + "/" + file.name : file.name}`,
        );
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

export async function readParcelFile(path: string) {
  const fileBuffer = await Deno.readFile(path);
  return new TextDecoder().decode(fileBuffer);
}

/**
 * Function to check if a file is a ".parcel" file.
 * @function
 * @param {string} fileName
 */
export function isParcelFile(fileName: string): boolean {
  return extname(fileName) === ".parcel";
}
