import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Retrieve token using NextAuth's helper
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Define public pages (e.g. login and any additional public paths)
  const publicPaths = ['/login', '/test5']; // Adjust or add paths as needed

  // If the request is for a public page
  if (publicPaths.includes(pathname)) {
    // If the user is already authenticated, redirect them to the dashboard
    if (token) {
      console.log('Authenticated user, redirecting to dashboard',token);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Otherwise, allow access to the public page
    return NextResponse.next();
  }

  // For any other (protected) route, if no token is present, redirect to login
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token is valid, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Include public pages as well as protected routes in the matcher
  matcher: ['/login', '/dashboard/:path*', '/profile/:path*']
};