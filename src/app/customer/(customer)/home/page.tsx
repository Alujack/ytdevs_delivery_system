"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/use-user-session";

interface DeliveryFormData {
  pickupAddr: string;
  dropoffAddr: string;
  categoryId: string;
  price: number;
  distance: number;
}


export default function DeliveryForm() {
  const [categories, setCategories] = useState<any>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<DeliveryFormData>({
    pickupAddr: "",
    dropoffAddr: "",
    categoryId: "",
    price: 0,
    distance: 0
  });
  

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/deliveries", formData);
      router.push("/orders");
      router.refresh();
    } catch (error: any) {
      setError(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "distance" ? parseFloat(value) : value
    }));
  };
    useEffect(() => {
      fetchCategories();
    }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Pickup Address</label>
        <input
          type="text"
          name="pickupAddr"
          value={formData.pickupAddr}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Dropoff Address</label>
        <input
          type="text"
          name="dropoffAddr"
          value={formData.dropoffAddr}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          {categories.map((item:any)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Distance (km)</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {loading ? "Processing..." : "Submit Delivery"}
      </button>
    </form>
  );
}