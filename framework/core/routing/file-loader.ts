export async function loadRoutes(path: string): Promise<boolean> {
  let routesLoaded = false;

  if (!await isDirectory(path)) {
    return routesLoaded;
  }

  for await (const file of Deno.readDir(path)) {
    if (!routesLoaded) {
      routesLoaded = true;
    }
    if (file.isFile) {
      try {
        await import(
          `file://${Deno.cwd()}/${path}/${file.name}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  }
  return routesLoaded;
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    if ((await Deno.lstat(path)).isDirectory) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
