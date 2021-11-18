export async function loadRoutes(): Promise<boolean> {
  let routesLoaded = false;
  for await (const file of Deno.readDir("./routes")) {
    if (!routesLoaded) {
      routesLoaded = true;
    }
    if (file.isFile) {
      try {
        console.log(Deno.cwd());
        await import(`./routes/${file.name}`);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return routesLoaded;
}
