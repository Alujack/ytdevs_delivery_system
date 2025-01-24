"use client"

import React from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();


  const menuItems = [
    { label:"Dashboard", route:"/admin/admin-dashboard"},
    { label:"Categories", route:"/admin/category"},
    { label:"Store", route:"/admin/store"},
    { label: "Company Member", route: "/admin/company-member" },
    { label: "Driver Member", route: "/admin/driver-member" },
    { label: "Customer", route: "/admin/customer" },
    { label: "Inventory", route: "/admin/inventory" },
    { label: "History", route: "/admin/order-history" },
    { label: "Notification", route: "/admin/notifications" },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="h-screen bg-blue-700 text-white w-64 flex flex-col">
      {/* Header */}
      {/* <div className="px-4 py-2 bg-orange-400 font-semibold">Store</div> */}

      {/* Menu Items */}
      <div className="flex flex-col mt-2 space-y-2 px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-blue-400 p-2 rounded"
            onClick={() => handleNavigation(item.route)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
