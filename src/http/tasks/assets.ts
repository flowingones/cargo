import { isProd } from "../../utils/environment.ts";
import { extension, log, mimeTypeByExtension } from "../../utils/mod.ts";
import { Get } from "../mod.ts";

export type AssetsOptions = {
  enableStreams?: boolean;
};

export function Assets(
  path: string,
  options?: AssetsOptions,
): () => Promise<void> {
  return async () => {
    return await loadAssets(path, options);
  };
}

type LoadAssetsOptions = Pick<AssetsOptions, "enableStreams">;

async function loadAssets(
  path: string,
  options?: LoadAssetsOptions,
): Promise<void> {
  try {
    for await (const file of Deno.readDir(path)) {
      if (file.isDirectory || file.isSymlink) {
        await loadAssets(
          `${path}/${file.name}`,
          options,
        );
      } else {
        registerAssets(`${path}/${file.name}`, options?.enableStreams);
      }
    }
  } catch (_err: unknown) {
    log(
      "HTTP CONTEXT",
      `No routes from the '${path}' directory loaded!`,
    );
  }
}

function registerAssets(path: string, streamResponse?: boolean): void {
  Get(`/${path}`, async () => {
    return new Response(
      streamResponse
        ? (await Deno.open(path)).readable
        : await Deno.readFile(path),
      {
        headers: {
          "Content-Type": mimeTypeByExtension(extension(path))?.type ||
            "text/plain",
          ...(isProd() ? { "Cache-Control": "max-age=3600" } : {}),
        },
      },
    );
  });
}
