'use client'
import ProductCard from '@/components/productCardUser';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FoodItem  {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};


export default function Home() {

   const [products, setProducts] = useState<FoodItem[]>([])
  useEffect(()=>{
    const fetch = async ()=>{
      const data = await axios.get('https://coding-fairy.com/api/mock-api-resources/express-delivery/products');
      if(data){
        setProducts(data.data)
      }
       console.log("company data", products);
    }
    fetch()

  }, [])
  

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
          {products.map((item, index) => (
           <ProductCard product={item}/>
          ))}
        </div>
      </div>
    </div>)
}