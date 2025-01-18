'use client'
import ProductCard from '@/components/productCardUser';
import { auth } from '@/libs/firebase/config';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface FoodItem  {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};


export default function Home() {

  const [user] = useAuthState(auth);
  const router = useRouter()
  // const userSession:any = sessionStorage.getItem('user');
   const [products, setProducts] = useState<FoodItem[]>([])
  if(true){}

  const navigateTo = (path:string) => {
    router.push(path);
  };
  

  return (
   <div className="flex flex-col gap-2 p-4 border rounded shadow-lg w-fit bg-white">
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    onClick={() => navigateTo('/admin/admin-dashboard')}
  >
    Admin
  </button>
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    onClick={() => navigateTo('/customer/home')}
  >
    Customer
  </button>
</div>

  );
}