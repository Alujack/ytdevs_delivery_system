import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // const token = req.cookies.get('token')?.value;
  // const signInPage = '/auth/login';
  // if (!token && req.nextUrl.pathname !== signInPage) {
  //   return NextResponse.redirect(new URL(signInPage, req.url));
  // }
  return NextResponse.next();
}
export const config = {
  matcher: '/((?!_next|api|static|favicon.ico).*)',
};
