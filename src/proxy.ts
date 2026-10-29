import { NextResponse, type NextRequest } from "next/server";

// Language routing: English is the primary language. "/" and unprefixed paths go to /en,
// unless the visitor has already read the Spanish site (a cookie holding only "en" or "es").
// The browser language is deliberately ignored so English stays the default for everyone.
const locales = ["en", "es"] as const;
const defaultLocale = "en";
const COOKIE = "NEXT_LOCALE";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const current = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (current) {
    // Remember the language being read so "/" returns to it next time.
    // Only real page loads count: a late prefetch of the other language must not overwrite the choice.
    const response = NextResponse.next();
    // Browsers send Sec-Fetch-Dest: "document" only for full page loads (fetch/prefetch requests say "empty").
    const dest = request.headers.get("sec-fetch-dest");
    const isPageLoad = (!dest || dest === "document") && !request.headers.has("rsc");
    if (isPageLoad && request.cookies.get(COOKIE)?.value !== current) {
      response.cookies.set(COOKIE, current, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
  }

  const saved = request.cookies.get(COOKIE)?.value;
  const locale = saved && (locales as readonly string[]).includes(saved) ? saved : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata routes, the API and any file with an extension (images, icons…).
  matcher: ["/((?!_next/|api/|robots\\.txt|sitemap\\.xml|icon|apple-icon|opengraph-image|.*\\.[\\w]+$).*)"],
};
