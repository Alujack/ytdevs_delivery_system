'use client'

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '@/components/productCard';


interface FoodItem  {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};
export default function Home() {
  const router = useRouter();
  

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
       <button onClick={()=>router.push("/admin/store/post-product")} type="button" className="right-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Add Product
        </button>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <ProductCard key={item.id} product={item}/>
          ))}
        </div>
      </div>
    </div>)
}