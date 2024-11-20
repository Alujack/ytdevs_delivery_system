"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EmailForm = () => {
    const router = useRouter();
  return (
    <div>
         <button onClick={()=>router.back()} className="pl-6 pt-6 self-start mb-4 text-gray-500 font-[1000]"><div className="w-4 h-4"><img src="/images/less-than-symbol.png" alt="" /></div></button>
    <div className="flex flex-col items-center  h-screen px-4">
     
      <h2 className="text-2xl font-semibold mb-1">Welcome back!</h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Enter your password to log in to your account
      </p>
      <div className="max-w-[40em] w-4/5 mb-4">
        <label htmlFor="code" className="text-sm font-medium text-gray-700">Password</label>
        <input
          id="code"
          type="password"
          className="max-w-[40em] w-full mt-1 border-b-2 border-black text-center outline-none focus:border-orange-500"
          placeholder="Enter the password"
        />
      </div>
      <button className="max-w-[40em] w-4/5 py-2 mt-4 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600">
        Sign in
      </button>

      <Link href="/forgot-password " className="mt-4 text-purple-600 text-sm font-semibold hover:underline">
        Forgot password?
      </Link>
    </div></div>
  );
};

export default EmailForm;