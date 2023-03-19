import { isProd } from "../../utils/environment.ts";

/**
 * Task to load a favicon from the provided path
 * and register a route (/favicon.ico) to it.
 * @param {string} path - Path to the location of the favicon
 */
export function Favicon(path: string) {
  return (app: any) => {
    app.getProtocol("http")?.router.add({
      path: "/favicon.ico",
      method: "GET",
      handler: async () => {
        try {
          const file = await Deno.open(path);
          return new Response(
            file.readable,
            {
              headers: {
                "content-type": "image/vnd.microsoft.icon",
                ...(isProd() ? { "cache-control": "max-age=3600" } : {}),
              },
            },
          );
        } catch (e) {
          if (e instanceof Deno.errors.NotFound) {
            throw new Error("Not able to load favicon");
          }
          throw e;
        }
      },
    });
  };
}
