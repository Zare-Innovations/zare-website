import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const PUBLIC_FILE = /\.(.*)$/;
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // Only protect /admin routes, excluding /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && pathname !== '/admin/forgot-password') {
    const token = request.cookies.get('access_token');
    const refreshToken = request.cookies.get('refresh_token');

    if (!token) {
      // If no access token, try to refresh if refresh token exists
      if (refreshToken) {
        // Call your refresh endpoint (adjust URL as needed)
        const refreshUrl = new URL('api/accounts/refresh-token', request.url);
        // Forward the refresh token as a cookie
        const response = NextResponse.redirect(request.url);
        response.cookies.set('refresh_token', refreshToken.value);

        // Optionally, you could fetch the refresh endpoint here and set new cookies
        // But in middleware, you can't do async fetch, so redirect to refresh endpoint
        return NextResponse.redirect(refreshUrl);
      } else {
        // No tokens, redirect to login
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
