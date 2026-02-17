import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Next.js 16 uses 'proxy' instead of 'middleware'
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/verifyemail";
    
    // Use 'loggedIn' cookie set by frontend (since httpOnly 'token' cookie from backend is not accessible here)
    const isLoggedIn = request.cookies.get("loggedIn")?.value === "true";

    // Redirect logged-in users away from landing page
    if (isLoggedIn && pathname === "/") {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (isLoggedIn && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url)); // Redirect to profile if already logged in and trying to access login/signup;
    }
    if (!isLoggedIn && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to main page with login and signup options if not logged in and trying to access protected routes;
    }
    
    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail", "/account", "/transactions"],
}
