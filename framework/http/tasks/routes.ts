import { log, name } from "../../utils/mod.ts";

export function autoloadRoutes(
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

export async function buildRoutes() {
  const fileContent: string[] = [];
  for await (const file of Deno.readDir("./pages")) {
    fileContent.push(`export * as ${name(file.name)} from "./${file.name}";\n`);
  }

  await Deno.writeTextFile("./.routes.ts", fileContent.join(""));
}
