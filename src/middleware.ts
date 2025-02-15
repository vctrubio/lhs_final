import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    if (url.pathname === '/pdf') {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next(); // Continue request as normal
}



// Apply middleware to all routes
export const config = {
    matcher: '/:path*', // This applies middleware to all routes
};
