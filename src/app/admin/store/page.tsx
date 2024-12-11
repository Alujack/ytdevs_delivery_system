'use client'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/libs/firebase/config'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user');
  // useEffect(() => {
  //   if (!user && !userSession) {
  //     router.push('/auth/login');
  //   }
  // }, [user, userSession, router]);

  // if (!user && !userSession) {
  //   // Optionally, you can render a loading state until `router.push` completes
  //   return <p>Redirecting...</p>;
  // }

  const items = [
    {
      image: "/images/image.jpg",
      rating: 3.5,
    },
    {
      image: "/images/image.jpg",
      rating: 3.5,
    },
    {
      image: "/images/image.jpg",
      rating: 3.5,
    },
    {
      image: "/images/image.jpg",
      rating: 3.5,
    },
     {
      image: "/images/image.jpg",
      rating: 3.5,
    },
    {
      image: "/images/image.jpg",
      rating: 3.5,
    },
  ];
  

  return (
   <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
  
        <div className="mb-6 max-w-[300px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 h-[35px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={item.image}
                alt={`Item ${index + 1}`}
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="text-yellow-500 text-sm">⭐</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>)
}