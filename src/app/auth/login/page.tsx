"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signInWithGoogle, signOutWithGoogle } from '@/libs/firebase/auth';
import { cookies } from 'next/headers';
import { createSession, removeSession } from '@/actions/server-action';
import { useUserSession } from '@/hooks/use-user-session';
import { SESSION_COOKIE_NAME } from '@/constants';

const SignIn = () => {

  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h2 className="text-3xl font-semibold mb-2">Sign In</h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        By using our services you are agreeing to our
        <Link href="/terms" className="text-blue-600 hover:underline ml-1">
          Terms
        </Link> 
        and 
        <Link href="/privacy" className="text-blue-600 hover:underline ml-1">
          Privacy Statement
        </Link>.
      </p>
      <Link href='/auth/email' className="text-center w-4/5 py-2 mb-3 border border-gray-300 rounded hover:bg-gray-100 max-w-[40em]">
        Sign in with Email
      </Link>
      <Link href='/auth/phone' className="text-center w-4/5 py-2 mb-3 border border-gray-300 rounded hover:bg-gray-100 max-w-[40em]">
        Sign in with Phone
      </Link >
      <Link href='auth/facebook' className="text-center w-4/5 py-2 mb-3 border border-gray-300 rounded hover:bg-gray-100 max-w-[40em]">
        Sign in with Facebook
      </Link >
      <button onClick={handleSignIn} className="text-center w-4/5 py-2 mb-6 border border-gray-300 rounded hover:bg-gray-100 max-w-[40em]">
        Sign in with Google
      </button>

      <div className="text-center">
        <div className ='flex flex-row justify-center mt-20'>
        <Image
              src="/images/YTDEvs_icon.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            /></div>
        <p className="text-sm">
          New here?{" "}
          <Link href="/auth/register" className="text-purple-600 font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
