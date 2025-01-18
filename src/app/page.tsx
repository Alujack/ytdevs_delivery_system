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
  const userSession = sessionStorage.getItem('user');
   const [products, setProducts] = useState<FoodItem[]>([])
  useEffect(() => {
    if (!user && !userSession) {
      router.push('/auth/login');
    }
  }, [user, userSession, router]);

  if (!user && !userSession) {
    // Optionally, you can render a loading state until `router.push` completes
    return <p>Redirecting...</p>;
  }

  
  const navigateTo = (path:string) => {
    router.push(path);
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <button onClick={() => navigateTo('/page1')}>Go to Page 1</button>
      <button onClick={() => navigateTo('/page2')}>Go to Page 2</button>
      <button onClick={() => navigateTo('/page3')}>Go to Page 3</button>
    </div>
  );
}