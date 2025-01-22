'use client'
import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Topbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter()

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/auth/email'
    })
    router.push('/auth/email')
  }

  return (
    <div className="flex items-center justify-between h-16 bg-gray-200 px-4 border-b border-gray-400">
      {/* Left Section */}
      <div></div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-3 relative">
        <span className="text-gray-700 font-medium">Admin</span>
        
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none"
        >
          <img
            src="/images/driver.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;