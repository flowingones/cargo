import { Get } from "./mod.ts";
import { getFileExtension, log, mimeTypeByExtension } from "../utils/mod.ts";

export async function autoloadRoutes(
  path: string,
  context?: string,
): Promise<void> {
  let routesLoaded = false;

  try {
    for await (const file of Deno.readDir(path)) {
      if (!routesLoaded) {
        routesLoaded = true;
      }
      if (file.isFile) {
        try {
          await import(`file://${Deno.cwd()}/${path}/${file.name}`);
        } catch (e) {
          console.log(e);
        }
      }
    }
  } catch (_err: unknown) {
    log(
      context || "HTTP CONTEXT",
      "No routes from the 'routes' directory loaded!",
    );
  }
}

export async function autoloadAssets(
  directoryPath: string,
  context?: string,
): Promise<void> {
  const basePath = directoryPath;
  try {
    for await (const file of Deno.readDir(basePath)) {
      if (file.isDirectory || file.isSymlink) {
        await autoloadAssets(
          `${basePath}/${file.name}`,
        );
      } else {
        registerAssets(`${basePath}/${file.name}`);
      }
    }
  } catch (_err: unknown) {
    log(
      context || "HTTP CONTEXT",
      "No routes from the 'assets' directory loaded!",
    );
  }
}

function registerAssets(pathToFile: string) {
  Get(`/${pathToFile}`, async () => {
    const file = await Deno.readFile(pathToFile);
    return new Response(file, {
      headers: {
        "Cache-Control": "max-age=3600",
        "content-type":
          mimeTypeByExtension(getFileExtension(pathToFile))?.type ||
          "text/plain",
      },
    });
  });
}
