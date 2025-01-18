// import { NextResponse } from "next/server";
// import admin from "firebase-admin";
// import { db } from "./libs/firebase/config";

// export async function middleware(req) {
//   const token = req.cookies.token || '';
//   if (!token) return NextResponse.redirect(new URL('/login', req.url));

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const userDoc = await db.collection('users').doc(decodedToken.uid).get();

//     if (!userDoc.exists) return NextResponse.redirect(new URL('/login', req.url));

//     const { role } = userDoc.data();
//     const { pathname } = req.nextUrl;

//     if (role === 'admin' && !pathname.startsWith('/admin')) {
//       return NextResponse.redirect(new URL('/admin/dashboard', req.url));
//     } else if (role === 'driver' && !pathname.startsWith('/driver')) {
//       return NextResponse.redirect(new URL('/driver/dashboard', req.url));
//     } else if (role === 'company' && !pathname.startsWith('/company')) {
//       return NextResponse.redirect(new URL('/company/dashboard', req.url));
//     } else if (role === 'user' && !pathname.startsWith('/user')) {
//       return NextResponse.redirect(new URL('/user/dashboard', req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error('Middleware error:', error);
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }
