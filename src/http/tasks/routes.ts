import { log } from "../../utils/mod.ts";

/**
 * @deprecated
 * Use the function "Routes" instead
 * Will be removed in version 1.x
 */
export const autoloadRoutes = Routes;

export function Routes(
  path: string,
  context?: string,
): () => Promise<void> {
  return async () => {
    await loadRoutes(path, context);
  };
}

async function loadRoutes(
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
      `No routes from the '${path}' directory loaded!`,
    );
  }
}
