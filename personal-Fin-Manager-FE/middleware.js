import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const isPublicPath = pathname === "/login" || pathname === "/signup";
    const token = request.cookies.get("token")?.value;

    if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl)) // Redirect to profile if already logged in and trying to access login/signup;
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.nextUrl)) // Redirect to login if not logged in and trying to access protected routes;
    }
    
    // Allow the request to proceed if no redirect is needed
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
}
