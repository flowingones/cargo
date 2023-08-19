import { Middleware } from "./middleware/mod.ts";

export type ProtocolConnectionInfo = {
  remoteAddr: ProtocolRemoteAddress;
};

export type ProtocolRemoteAddress = {
  transport: string;
  hostname?: string;
  port?: number;
};

export type Protocol = {
  listen(port?: number): void;
  middleware(middleware: Middleware[] | Middleware): Protocol;
};
