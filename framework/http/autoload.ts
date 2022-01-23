import { Get } from "./mod.ts";
import { extension, log, mimeTypeByExtension } from "../utils/mod.ts";

export async function autoloadRoutes(
  path: string,
  context?: string,
): Promise<void> {
  try {
    for await (const file of Deno.readDir(path)) {
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
  path: string,
  context?: string,
): Promise<void> {
  try {
    for await (const file of Deno.readDir(path)) {
      if (file.isDirectory || file.isSymlink) {
        await autoloadAssets(
          `${path}/${file.name}`,
        );
      } else {
        registerAssets(`${path}/${file.name}`);
      }
    }
  } catch (_err: unknown) {
    log(
      context || "HTTP CONTEXT",
      "No routes from the 'assets' directory loaded!",
    );
  }
}

function registerAssets(path: string) {
  Get(`/${path}`, async () => {
    const file = await Deno.readFile(path);
    return new Response(file, {
      headers: {
        "Cache-Control": "max-age=3600",
        "content-type": mimeTypeByExtension(extension(path))?.type ||
          "text/plain",
      },
    });
  });
}
