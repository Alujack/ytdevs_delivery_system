"use client"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface FoodItem  {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
};

export default function FoodList() {

    const [foodItems, setFoodItems] = useState<FoodItem[]>([])
    useEffect(()=>{
      const fetch = async ()=>{
        const data = await axios.get('https://coding-fairy.com/api/mock-api-resources/express-delivery/products');
        if(data){
          setFoodItems(data.data)
        }
      }
      fetch()
    }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      <div className="space-y-4">
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          ><Link href={`/products/${food.id}`}>
            {/* <Image
              src={food.imageUrl}
              alt={food.name}
              width={100}
              height={100}
              className="rounded-md"
            /> */}
            </Link>
            <div className="ml-4 flex-1">
              <Link href={`products/${food.id}`}>
              <h2 className="text-lg font-semibold">{food.name}</h2>
              </Link>
              <Link href="/restaurants" className="text-blue-500 text-sm">
                {food.restaurant}
              </Link>
              <p className="text-gray-500 text-sm mt-1">Rating: {food.rating} ⭐</p>
            </div>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
