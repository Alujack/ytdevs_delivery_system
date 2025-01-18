// pages/drivers/insert.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function InsertDriver() {
  const [driver, setDriver] = useState({
    profile: "",
    driverName: "",
    driverId: "",
    phoneNumber: "",
    email: "",
    location: "",
    balance: 0.0,
    status: "Active",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      "https://coding-fairy.com/api/mock-api-resources/express-delivery/drivers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      }
    );

    if (response.ok) {
      alert("Driver added successfully!");
      router.push("/drivers");
    } else {
      alert("Error adding driver");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-blue-600 ">Add New Driver</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Profile URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile URL</label>
            <input
              type="text"
              name="profile"
              value={driver.profile}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Driver Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={driver.driverName}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Driver ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Driver ID</label>
            <input
              type="text"
              name="driverId"
              value={driver.driverId}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={driver.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={driver.email}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={driver.location}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Balance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Balance</label>
            <input
              type="number"
              name="balance"
              value={driver.balance}
              onChange={handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={driver.status}
              onChange={(e)=>handleChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
}
