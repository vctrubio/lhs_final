import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Allow legitimate routes
  const validPaths = [
    '/',
    '/ventas',
    '/alquiler', 
    '/contacto',
    '/development'
  ];
  
  // Check if it's a dynamic property route (single segment, not a valid path)
  const segments = url.pathname.split('/').filter(Boolean);
  const isDynamicRoute = segments.length === 1 && !validPaths.includes(url.pathname);
  const isPdfRoute = segments.length === 2 && segments[1] === 'pdf';
  
  // Redirect invalid routes to home
  if (!validPaths.includes(url.pathname) && !isDynamicRoute && !isPdfRoute) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
