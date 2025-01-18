import Link from "next/link";
import React from "react";

const Dashboard: React.FC = () => {
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
            <p className="text-4xl font-bold">Total: 560</p>
          </div></Link>

        {/* Total Driver */}
        <Link href="/admin/admin-dashboard/total-driver">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span>Total Driver</span>
            </div>
            <p className="text-4xl font-bold">Total: 800</p>
          </div>
        </Link>

        {/* Total Customer */}
        <Link href="/admin/admin-dashboard/total-customer">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span >Total Customer</span>
            </div>
            <p className="text-4xl font-bold">Total: 2500</p>
          </div>
        </Link>
        {/* Total Delivery */}
        <Link href="/admin/admin-dashboard/total-delivery">
          <div className="h-[200px] bg-orange-500 text-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span>10/15/2024 - 10/15/2024</span>
              <span>Total Delivery</span>
            </div>
            <p className="text-4xl font-bold">Total: 300</p>
          </div></Link>
      </div>
    </div>
  );
};

export default Dashboard;
