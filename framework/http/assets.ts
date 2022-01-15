import { Get } from "./mod.ts";
import { getFileExtension, log, mimeTypeByExtension } from "../utils/mod.ts";

export async function assetsFromDir(
  directoryPath = "assets",
): Promise<void> {
  const basePath = directoryPath;
  try {
    for await (const file of Deno.readDir(basePath)) {
      if (file.isDirectory || file.isSymlink) {
        await assetsFromDir(
          `${basePath}/${file.name}`,
        );
      } else {
        registerAssets(`${basePath}/${file.name}`);
      }
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      log("APP", "No routes from the 'assets' directory loaded!");
    }
  }
}

function registerAssets(pathToFile: string) {
  Get(`/${pathToFile}`, async () => {
    const file = await Deno.readFile(pathToFile);
    return new Response(file, {
      headers: {
        "content-type":
          mimeTypeByExtension(getFileExtension(pathToFile))?.type ||
          "text/plain",
      },
    });
  });
}
