"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStats {
  totalCompanies: number;
  totalDrivers: number;
  totalCustomers: number;
  totalDeliveries: number;
}

interface FetchDashboardStatsParams {
  period?: 'day' | 'week' | 'month' | 'custom';
  startDate?: string; // ISO date string
  endDate?: string;   // ISO date string
}

const Dashboard: React.FC = () => {
   const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState({
    totalCompanies: 0,
    totalDrivers: 0,
    totalCustomers: 0,
    totalDeliveries: 0,
  });

  const fetchCounts = async (period: string = 'day', startDate?: string, endDate?: string) => {
  try {
    const params = new URLSearchParams({ period });
    if (startDate && endDate) {
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }

    const response = await fetch(`/api/dashboard/admin?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch counts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


   useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCounts('day', '2025-01-01', '2025-01-21');
        setCounts(data);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Total Company */}
        <Link href="/admin/admin-dashboard/total-company">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span>Total Company</span>
            </div>
            <p className="text-4xl font-bold">Total: {counts.totalCompanies}</p>
          </div></Link>

        {/* Total Driver */}
        <Link href="/admin/admin-dashboard/total-driver">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span>Total Driver</span>
            </div>
            <p className="text-4xl font-bold">Total: {counts.totalDrivers}</p>
          </div>
        </Link>

        {/* Total Customer */}
        <Link href="/admin/admin-dashboard/total-customer">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span >Total Customer</span>
            </div>
            <p className="text-4xl font-bold">Total: {counts.totalCustomers}</p>
          </div>
        </Link>
        {/* Total Delivery */}
        <Link href="/admin/admin-dashboard/total-delivery">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span>Total Delivery</span>
            </div>
            <p className="text-4xl font-bold">Total: {counts.totalDeliveries}</p>
          </div></Link>
      </div>
    </div>
  );
};

export default Dashboard;
