"use client";

import React from "react";
import { Truck, Users, Building2, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center">
            <Truck className="h-10 w-10 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-800">DeliveryPro</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Seamless Delivery Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect, deliver, and grow with our comprehensive delivery platform. Whether you're a customer, driver, or business, we've got you covered.
            </p>

            <div className="space-y-4">
              {/* Customer Section */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                <Users className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">For Customers</h3>
                  <p className="text-gray-600">Easy, fast deliveries right to your doorstep</p>
                  <button
                    onClick={() => router.push("/auth/register?role=customer")}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Register as Customer <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Driver Section */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                <Truck className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">For Drivers</h3>
                  <p className="text-gray-600">Earn money on your own schedule</p>
                  <button
                    onClick={() => router.push("/auth/register?role=driver")}
                    className="text-green-600 hover:text-green-800 flex items-center"
                  >
                    Become a Driver <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Business Section */}
              <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
                <Building2 className="h-10 w-10 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-bold text-lg">For Businesses</h3>
                  <p className="text-gray-600">Expand your delivery capabilities</p>
                  <button
                    onClick={() => router.push("/auth/register?role=business")}
                    className="text-purple-600 hover:text-purple-800 flex items-center"
                  >
                    Register Company <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden md:block">
            <Image
              src="https://img.freepik.com/premium-vector/motorbike-delivery-service-icon_658271-1395.jpg?w=996"
              alt="Delivery Illustration"
              className="rounded-lg shadow-2xl"
              width={500}
              height={600}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 DeliveryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
