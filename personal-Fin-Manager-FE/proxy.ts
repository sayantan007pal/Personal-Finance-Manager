import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname === "/verifyemail";
    const token = request.cookies.get("token")?.value;

    // Redirect logged-in users away from landing page
    if (token && pathname === "/") {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url)); // Redirect to profile if already logged in and trying to access login/signup;
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url)); // Redirect to main page with login and signup options if not logged in and trying to access protected routes;
    }
    
    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verifyemail"],
}
