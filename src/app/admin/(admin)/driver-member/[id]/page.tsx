// pages/drivers/[id].tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditDriver(params:{params:{id:string}}) {
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

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = params.params;  // Get the ID from the URL

  useEffect(() => {
    const fetchDriver = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `https://coding-fairy.com/api/mock-api-resources/express-delivery/company/${id}`
        );
        const data = await response.json();
        setDriver(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDriver();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriver((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `https://coding-fairy.com/api/mock-api-resources/express-delivery/company/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      }
    );

    if (response.ok) {
      alert("Driver updated successfully!");
      router.push("/drivers");
    } else {
      alert("Error updating driver");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen p-4">
      <h1 className="text-xl mb-4">Edit Driver</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile URL</label>
          <input
            type="text"
            name="profile"
            value={driver.profile}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Driver Name</label>
          <input
            type="text"
            name="driverName"
            value={driver.driverName}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Driver ID</label>
          <input
            type="text"
            name="driverId"
            value={driver.driverId}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
            disabled
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={driver.phoneNumber}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={driver.email}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={driver.location}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Balance</label>
          <input
            type="number"
            name="balance"
            value={driver.balance}
            onChange={handleChange}
            className="block w-full p-2 mb-2"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={driver.status}
            onChange={(e)=>handleChange}
            className="block w-full p-2 mb-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
