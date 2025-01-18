"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface FoodItem {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
}

export default function ProductDetail(params: { params: { id: string } }) {
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const id = params.params.id;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `https://coding-fairy.com/api/mock-api-resources/express-delivery/products/${id}`
        );
        setFoodItem(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetch();
  }, [id]);

  return (
    <main className="flex flex-col items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Product Details</h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={foodItem?.imageUrl || "/images/product.png"}
            alt={foodItem?.name || "Product"}
            className="w-48 h-48 object-cover rounded-lg border border-gray-300"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-700">{foodItem?.name || "Product Name"}</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Restaurant:</span> {foodItem?.restaurant || "N/A"}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Rating:</span> {foodItem?.rating || "N/A"} ⭐
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300">
                -
              </button>
              <p className="font-semibold">02</p>
              <button className="w-8 h-8 flex justify-center items-center bg-gray-200 rounded-full hover:bg-gray-300">
                +
              </button>
              <p className="text-lg font-bold ml-auto">$5.8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-6">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Description</h3>
        <p className="text-gray-600 text-justify leading-relaxed">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Pasta is a versatile Italian staple made
          from wheat flour and water. It comes in many shapes, is typically boiled, and pairs with
          various sauces like marinara or pesto. Quick to prepare, pasta offers a satisfying source
          of carbohydrates and is enjoyed globally in countless dishes.
        </p>
      </div>

      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-medium">Delivery Fee:</p>
          <p className="text-lg font-bold">$1</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-700 font-medium">Total Fee:</p>
          <p className="text-lg font-bold">$6.7</p>
        </div>
      </div>

      <button className="mt-5 px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-500 transition duration-300">
        Add to Cart
      </button>
    </main>
  );
}
