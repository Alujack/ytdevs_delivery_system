import React from "react";

const ScanCardScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="flex items-center justify-center w-64 h-40 border-2 border-orange-500 rounded-lg">
        <span className="text-4xl text-orange-500">📷</span>
      </div>
      <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600">
        Scan your card
      </button>
    </div>
  );
};

export default ScanCardScreen;
