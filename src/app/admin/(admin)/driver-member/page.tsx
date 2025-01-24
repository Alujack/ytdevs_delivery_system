"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface Driver {
  id: string;
  driverName: string;
  driverId: string;
  phoneNumber: string;
  email: string;
  location?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}



export default function DriverManagementPage() {
  const router = useRouter();
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    async function fetchDrivers() {
      const response = await fetch("/api/dashboard/admin/drivers");
      const data = await response.json();
      setDrivers(data);
    }
    fetchDrivers();
  }, []);

  const approveDriver = async (id: string) => {
    await fetch(`/api/dashboard/admin/drivers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: true }),
    });
    setDrivers((prev) =>
      prev.map((driver) => (driver.id === id ? { ...driver, isApproved: true } : driver))
    );
  };

  const deleteDriver = async (id: string) => {
    await fetch(`/api/dashboard/admin/drivers/${id}`, { method: "DELETE" });
    setDrivers((prev) => prev.filter((driver) => driver.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Driver Management</h1>
      <button
        onClick={() => router.push("/admin/driver-member/insert")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Driver
      </button>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-6 py-3 text-left">Driver Name</th>
            <th className="px-6 py-3 text-left">Phone Number</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-3">{driver.driverName}</td>
              <td className="px-6 py-3">{driver.phoneNumber}</td>
              <td className="px-6 py-3">{driver.email}</td>
              <td className="px-6 py-3 text-center">
                {!driver.isApproved && (
                  <button
                    onClick={() => approveDriver(driver.id)}
                    className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => router.push(`/admin/driver-member/edit/${driver.id}`)}
                  className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteDriver(driver.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
