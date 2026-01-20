// File: src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Allow public files
    const PUBLIC_FILE = /\.(.*)$/;
    if (PUBLIC_FILE.test(pathname)) {
        return NextResponse.next();
    }

    // 2. Protect /admin routes
    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthPage = pathname === '/admin/login' || pathname === '/admin/forgot-password';

    if (isAdminRoute && !isAuthPage) {
        const token = request.cookies.get('access_token');
        const refreshToken = request.cookies.get('refresh_token');

        if (!token) {
            if (refreshToken) {
                // Redirect to refresh endpoint
                const refreshUrl = new URL('/api/accounts/refresh-token', request.url);
                return NextResponse.redirect(refreshUrl);
            } else {
                // No tokens, go to login
                const loginUrl = new URL('/admin/login', request.url);
                return NextResponse.redirect(loginUrl);
            }
        }
    }

    return NextResponse.next();
}

// THE MATCHER GOES HERE, NOT IN NEXT.CONFIG.TS
export const config = {
    matcher: [
        '/admin/:path*',
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};