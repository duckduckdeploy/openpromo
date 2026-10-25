import type { FastifyRequest } from "fastify";
import { env } from "../env";

/** The visitor's address for rate limits: the edge proxy's header when one is set (CLIENT_IP_HEADER). */
export function visitorOf(request: FastifyRequest) {
  const header = env.CLIENT_IP_HEADER ? request.headers[env.CLIENT_IP_HEADER.toLowerCase()] : undefined;
  return (Array.isArray(header) ? header[0] : header) || request.ip;
}
