import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("x-pathname", request.nextUrl.pathname);
  response.headers.set(
    "x-search-params",
    request.nextUrl.searchParams.toString()
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
