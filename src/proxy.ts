import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip internal paths and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferRussian = acceptLanguage.toLowerCase().includes("ru");
  const locale = preferRussian ? "ru" : DEFAULT_LOCALE;

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|.*\\..*).*)"],
};
