import { isProd } from "../../utils/environment.ts";
import { extension, log, mimeTypeByExtension } from "../../utils/mod.ts";
import { Get } from "../mod.ts";

/**
 * @deprecated
 * Use the function "Assets" instead
 * Will be removed in version 1.x
 */
export const autoloadAssets = Assets;

export function Assets(
  path: string,
  context?: string,
): () => Promise<void> {
  return async () => {
    return await loadAssets(path, context);
  };
}

async function loadAssets(
  path: string,
  context?: string,
): Promise<void> {
  try {
    for await (const file of Deno.readDir(path)) {
      if (file.isDirectory || file.isSymlink) {
        await loadAssets(
          `${path}/${file.name}`,
        );
      } else {
        registerAssets(`${path}/${file.name}`);
      }
    }
  } catch (_err: unknown) {
    log(
      context || "HTTP CONTEXT",
      `No routes from the '${path}' directory loaded!`,
    );
  }
}

function registerAssets(path: string): void {
  Get(`/${path}`, async () => {
    const file = await Deno.open(path);
    return new Response(file.readable, {
      headers: {
        "content-type": mimeTypeByExtension(extension(path))?.type ||
          "text/plain",
        ...(isProd() ? { "cache-control": "max-age=3600" } : {}),
      },
    });
  });
}
