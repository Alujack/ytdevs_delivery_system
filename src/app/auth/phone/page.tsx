"use client"
import Link from 'next/link';
import React from 'react';
import Login from './login'
import {getAuth , onAuthStateChanged } from "firebase/auth"
import {signOutWithGoogle} from"@/libs/firebase/auth";
import {auth} from "@/libs/firebase/config"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

const PhoneForm = () => {
    
  const router = useRouter();

  useEffect (()=>{
    onAuthStateChanged(auth,(user) =>{
      if (user){
        console.log(user);
        // router.push('./login')
      }
    });
  },[auth , router])
  return (
    <div className="">
         <button onClick={()=>router.back()} className="pl-6 pt-6 self-start mb-4 text-gray-500 font-[1000]"><div className="w-4 h-4"><img src="/images/less-than-symbol.png" alt="" /></div></button>
    <div className="flex flex-col items-center  h-screen px-4">
     
      <h2 className="text-2xl font-semibold mb-1">Welcome back!</h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Enter your phone to log in to your account
      </p>
      <div className="w-4/5 mb-4 border border-gray-300 rounded-md p-4">
        
        <Login />
      </div>
      

      <Link href="/forgot-password " className="mt-4 text-purple-600 text-sm font-semibold hover:underline">
        Forgot password?
      </Link>
    </div></div>
  );
};
export default PhoneForm

// export default function Home() {


//   return ( 
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//       <button onClick={signOutWithGoogle}> Log out</button>
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Firebase Phone Authentication

//       </h1>
//       <p className="text-center text-gray-600 mb-6">
//         Please enter your phone number with + and country code to authenticate.
//         <br/>example : +322 3221234
//       </p>
//       <div className="border border-gray-300 rounded-md p-4">
//         <Login />
//       </div>
//     </div>
//   </div>
//   )
// }
