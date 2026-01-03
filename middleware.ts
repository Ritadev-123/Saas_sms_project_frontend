import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    // 1. Protect Organisation Routes (but allow /dashboard itself for login)
    if (pathname.startsWith('/dashboard') && pathname !== '/dashboard') {
        if (!accessToken) {
            // Not logged in - redirect to root login
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (role !== 'organisation') {
            // Wrong role - redirect to their correct dashboard
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    // 2. Protect School Routes (but allow /admin itself for login)
    if (pathname.startsWith('/admin/dashboard')) {
        if (!accessToken) {
            // Not logged in - redirect to admin login
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        if (role !== 'school') {
            // Wrong role - redirect to their correct dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
