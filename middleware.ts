// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const publicRoutes = ['/import', '/create', "/"]; 
  const privateRoutes = ['/wallet', '/dashboard']; 

  const publicKey = request.cookies.get('publicKey');
  const privateKey = request.cookies.get('privateKey');

  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname === route);

  const isPrivateRoute = privateRoutes.some((route) => request.nextUrl.pathname === route);

  if (isPrivateRoute && !publicKey && !privateKey) {
    return NextResponse.redirect(new URL('/import', request.url));
  }

  if (isPublicRoute && (publicKey || privateKey)) {
    return NextResponse.redirect(new URL('/wallet', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
