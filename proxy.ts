import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isCLIUserAgent } from "./lib/cli-detect";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");

  // If visitor is using curl, wget, httpie, or other terminal CLI tools,
  // stream the rich animated terminal interface instead of serving HTML!
  if (isCLIUserAgent(userAgent)) {
    const cliUrl = request.nextUrl.clone();
    if (request.nextUrl.pathname.endsWith("/live")) {
      cliUrl.searchParams.set("live", "1");
    }
    cliUrl.pathname = "/api/cli";
    return NextResponse.rewrite(cliUrl);
  }

  // Otherwise, handle internationalized web browser routing
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for internal assets, api, or static files
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
