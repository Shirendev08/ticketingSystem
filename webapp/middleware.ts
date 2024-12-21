import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for access token in cookies
  const token = request.cookies.get("accessToken");

  // Redirect to login if there's no token and the user is trying to access '/'
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (token && request.nextUrl.pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  

  return NextResponse.next();
}

// Specify the paths to apply this middleware to
export const config = {
  matcher: ["/", "/login","/register"],  // Only apply middleware to '/' route
};
