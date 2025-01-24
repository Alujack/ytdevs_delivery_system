import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role as string;

    // Check if user is authenticated
    const isAuthenticated = !!token;

    // Redirect to login if not authenticated and not on the login page
    if ((!isAuthenticated && path !== 'auth/login') || (!isAuthenticated && path !== 'auth/register')) {
      return NextResponse.redirect(new URL('auth/login', req.url));
    }

    // if (isAuthenticated) {
    //   if (
    //     (path.startsWith('/admin/admin-dashboard') && role !== 'ADMIN') ||
    //     (path.startsWith('/company/home') && role !== 'COMPANY') ||
    //     (path.startsWith('/drivers/home') && role !== 'DRIVER') ||
    //     (path.startsWith('/customer/home') && role !== 'CUSTOMER')
    //   ) {
    //     return NextResponse.redirect(new URL('/auth/login', req.url));
    //   }
    // }

    // if (path !== '/wrapper') {
    //   switch (role) {
    //     case 'ADMIN':
    //       return NextResponse.redirect(new URL('/admin/admin-dashboard', req.url));
    //     case 'COMPANY':
    //       return NextResponse.redirect(new URL('/company/home', req.url));
    //     case 'DRIVER':
    //       return NextResponse.redirect(new URL('/drivers/home', req.url));
    //     case 'CUSTOMER':
    //       return NextResponse.redirect(new URL('/customer/home', req.url));
    //     default:
    //       return NextResponse.redirect(new URL('/auth/signin', req.url));
    //   }
    // }

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