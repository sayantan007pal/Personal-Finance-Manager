import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === "/login" || pathname === "/signup";
    const token = request.cookies.get("token")?.value;

    // Handle root path - redirect based on auth status
    if (pathname === "/") {
        if (token) {
            return NextResponse.redirect(new URL('/profile', request.url));
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url)); // Redirect to profile if already logged in and trying to access login/signup;
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login if not logged in and trying to access protected routes;
    }
    
    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
}
