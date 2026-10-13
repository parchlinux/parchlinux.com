/**
 * CLI detection helper for Terminal curl/wget visitors.
 * Checks User-Agent safely and strictly to prevent spoofing or matching ordinary browsers.
 */
export function isCLIUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== "string") return false;

  const ua = userAgent.trim().toLowerCase();

  // Common CLI HTTP clients
  const cliClients = [
    "curl/",
    "wget/",
    "httpie/",
    "fetch/",
    "aria2/",
    "curlie/",
    "wuzz/",
  ];

  for (const client of cliClients) {
    if (ua.startsWith(client)) {
      return true;
    }
  }

  // Exact matches (e.g. some minimalist tools send just "curl" or "wget")
  if (ua === "curl" || ua === "wget" || ua === "httpie") {
    return true;
  }

  return false;
}
