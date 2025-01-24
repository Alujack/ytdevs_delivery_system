"use client";

import {  useState } from 'react';
import { useRouter } from 'next/navigation';

interface FoodItem {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  restaurant: string;
}

export default function Home() {
  const router = useRouter();
  const [isDriver, setIsDriver] = useState(false);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        {!isDriver && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Become a Driver</h2>
            <p className="text-gray-600 mb-4">Join our delivery team and start earning today!</p>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="w-[300px]">
            <input
              type="text"
              placeholder="Search deliveries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 h-[35px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Filter by Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
            </select>
            <select className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Sort by</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Delivery Cards */}
          {[1, 2, 3].map((delivery) => (
            <div key={delivery} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Delivery #{delivery}</h3>
                    <p className="text-gray-600">2.5 km away</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    Pending
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Pickup:</span> 123 Main St
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Dropoff:</span> 456 Park Ave
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Price:</span> $15.00
                  </p>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Accept Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}