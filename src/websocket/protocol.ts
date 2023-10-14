import { Middleware } from "../middleware/middleware.ts";
import { Protocol } from "../mod.ts";

export class WebsocketProtocol implements Protocol {
  listen(port?: number | undefined): void {
    throw new Error("Method not implemented.");
  }
  middleware(middleware: Middleware | Middleware[]): Protocol {
    throw new Error("Method not implemented.");
  }
}
