import React, { useState } from 'react';

const DetailModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-3 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Detail
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              ❌
            </button>
            <div className="text-2xl font-bold text-orange-500 mb-5">Detail</div>
            <div className="flex justify-between">
              <div className="text-center mr-5">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Profile" 
                  className="w-36 h-36 rounded-lg border border-orange-500" 
                />
                <div className="mt-2 text-lg">Photo</div>
              </div>
              <div className="grid grid-cols-2 gap-5 w-full">
                <div className="flex flex-col">
                  <label>Name</label>
                  <input type="text" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>Age</label>
                  <input type="number" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>Address</label>
                  <input type="text" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>Position</label>
                  <input type="text" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <input type="tel" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>Store ID</label>
                  <input type="text" className="p-2 border rounded-md" />
                </div>
                <div className="flex flex-col">
                  <label>ID Card</label>
                  <input type="text" className="p-2 border rounded-md" />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5 space-x-3">
              <button className="bg-blue-400 text-white p-2 rounded-md">✏️</button>
              <button className="bg-red-500 text-white p-2 rounded-md">🗑️</button>
              <button
                className="bg-gray-500 text-white p-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailModal;
