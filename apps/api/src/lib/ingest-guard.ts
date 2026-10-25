import { env } from "../env";
import type { GuardOptions } from "./ssrf";

/** SSRF guard settings for reading websites: public addresses on ports 80 and 443, unless allowed. */
export function ingestGuardOptions(): GuardOptions {
  if (env.INGEST_ALLOW_PRIVATE_NETWORK === "true") return { allowPrivateNetwork: true, allowedPorts: Array.from({ length: 65535 }, (_, i) => i + 1) };
  return {};
}
