import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
 const PUBLIC_FILE = /\.(.*)$/;
    if (

    PUBLIC_FILE.test(pathname) 
  ) {
    return NextResponse.next();
  }

  // Only protect /admin routes, excluding /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('access_token');

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect only /admin routes, but skip _next (includes images, static, etc.)
    '/admin/:path*',
    // Exclude image optimization and other static resources
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
