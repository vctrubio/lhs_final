import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // if (url.pathname === "/pdf")
    //     return NextResponse.redirect(new URL("/", request.url));
    //
    // //NOTE: added until download btn installed for pdf
    // if (url.pathname.startsWith('/pdf'))
    //     return NextResponse.redirect(new URL('/', request.url));

    return NextResponse.next();
}

export const config = {
    matcher: "/:path*",
};