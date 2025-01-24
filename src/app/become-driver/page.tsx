// app/become-driver/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BecomeDriver() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      license: formData.get("license"),
      vehicle: formData.get("vehicle"),
    };

    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

       router.back(); 
      router.refresh(); 
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Become a Driver</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="license" className="block text-gray-700 mb-2">
            Driver License
          </label>
          <input
            type="text"
            id="license"
            name="license"
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vehicle" className="block text-gray-700 mb-2">
            Vehicle Details
          </label>
          <input
            type="text"
            id="vehicle"
            name="vehicle"
            required
            className="w-full p-2 border rounded"
            placeholder="Year, Make, Model"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Register as Driver"}
        </button>
      </form>
    </div>
  );
}