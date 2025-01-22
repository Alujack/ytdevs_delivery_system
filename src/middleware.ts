import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string;

    // Handle post-authentication redirects based on role
    if (path === '/') {
      switch (role) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/admin/admin-dashboard', req.url));
        case 'COMPANY':
          return NextResponse.redirect(new URL('/company/home', req.url));
        case 'DRIVER':
          return NextResponse.redirect(new URL('/drivers/home', req.url));
        case 'CUSTOMER':
          return NextResponse.redirect(new URL('/customer/home', req.url));
        default:
          return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }

    // Protect role-specific routes
    if (
      (path.startsWith('/admin') && role !== 'ADMIN') ||
      (path.startsWith('/company') && role !== 'COMPANY') ||
      (path.startsWith('/driver') && role !== 'DRIVER') ||
      (path.startsWith('/user') && role !== 'CUSTOMER')
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/company/:path*',
    '/driver/:path*',
    '/user/:path*',
  ],
};