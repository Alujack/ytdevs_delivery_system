"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {  useRouter } from "next/navigation";
import axios from "axios";

// Type definition for the driver object
interface Driver {
  id: number;
  profile: string;
  driverName: string;
  driverId: string;
  phoneNumber: string;
  email: string;
  location: string;
  balance: number;
  status: string;
}

export default function TableDemo() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
   const router = useRouter()

  
 useEffect(() => {
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "https://coding-fairy.com/api/mock-api-resources/express-delivery/drivers"
      );
      setDrivers(response.data);
      console.log(drivers); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  fetchDrivers();
}, [drivers]);


  // Add a new driver (send data to the API)
  const addDriver = async () => {
    const newDriver: Driver = {
      id: drivers.length + 1,
      profile: "https://example.com/profiles/driver11.jpg",
      driverName: "New Driver",
      driverId: `D0${drivers.length + 1}`,
      phoneNumber: "+9876543210",
      email: "newdriver@example.com",
      location: "New York, NY",
      balance: 50.0,
      status: "Active",
    };

    try {
      const response = await fetch(
        "https://coding-fairy.com/api/mock-api-resources/express-delivery/drivers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDriver),
        }
      );

      if (response.ok) {
        const createdDriver = await response.json();
        setDrivers([...drivers, createdDriver]); 
      } else {
        console.error("Failed to add driver");
      }
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  // Update driver data (send data to the API)
  const updateDriver = async (id: number) => {
    const updatedDriver = drivers.find((driver) => driver.id === id);

    if (!updatedDriver) return;

    const updatedDriverData: Driver = {
      ...updatedDriver,
      driverName: "Updated Name",
      status: "Inactive",
    };

    try {
      const response = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/express-delivery/drivers/${id}`, // Replace with your API endpoint for updating a driver
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDriverData),
        }
      );

      if (response.ok) {
        const updatedDriverResponse = await response.json();
        const updatedDrivers = drivers.map((driver) =>
          driver.id === id ? updatedDriverResponse : driver
        );
        setDrivers(updatedDrivers); // Update the state with the updated driver
      } else {
        console.error("Failed to update driver");
      }
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  // Delete a driver (send data to the API)
  const deleteDriver = async (id: number) => {
    try {
      const response = await fetch(
        `https://coding-fairy.com/api/mock-api-resources/express-delivery/drivers/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const filteredDrivers = drivers.filter((driver) => driver.id !== id);
        setDrivers(filteredDrivers); // Update the state after deleting the driver
      } else {
        console.error("Failed to delete driver");
      }
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  // Loading and display logic
  if (loading) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="h-screen p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={()=>router.push("/admin/driver-member/insert")}
      >
        Add Driver
      </button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] px-10">Profile</TableHead>
            <TableHead>Driver Name</TableHead>
            <TableHead>Driver ID</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell className="px-10">
             
              </TableCell>
              <TableCell>{driver.driverName}</TableCell>
              <TableCell>{driver.driverId}</TableCell>
              <TableCell>{driver.phoneNumber}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>{driver.location}</TableCell>
              <TableCell>
                <button
                  className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => updateDriver(driver.id)}
                >
                  Update
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteDriver(driver.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
