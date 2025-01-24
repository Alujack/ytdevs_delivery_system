"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserSession } from '@/hooks/use-user-session';
import axios from 'axios';

interface Delivery {
  id: number;
  pickup: string;
  dropoff: string;
  price: number;
  distance: number;
  status: string;
}

export default function Home() {
  const userId = useUserSession('');
  const router = useRouter();
  const [isDriver, setIsDriver] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const isDrivers = async () => {
    try {
      const response = await axios.get(`/api/drivers?userId=${userId}`);
      setIsDriver(response.data.isDriver);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/deliveries/pending');
      setDeliveries(response.data.deliveries);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      isDrivers();
    }
  }, [userId]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleBecomeDriver = () => {
    router.push('home/become-driver');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        {!isDriver && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Become a Drivers Company</h2>
            <p className="text-gray-600 mb-4">Join our delivery team and start earning today!</p>
            <button
              onClick={handleBecomeDriver}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Register as Company
            </button>
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
          {deliveries.map((delivery)=>(
            <div key={delivery.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Delivery #{delivery.id}</h3>
                    <p className="text-gray-600">{delivery.distance} km away</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {delivery.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Pickup:</span> {delivery.pickup}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Dropoff:</span> {delivery.dropoff}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Price:</span> ${delivery.price.toFixed(2)}
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
