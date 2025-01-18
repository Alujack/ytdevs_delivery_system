import React from "react";

const FavoriteDrivers = () => {
  // Sample drivers data (replace with dynamic data if needed)
  const drivers = [
    {
      id: "000001",
      name: "Jame Rogino",
      phone: "0123456789",
      image: "images/driver.png", // Replace with actual images
    },
    {
      id: "000002",
      name: "Alice Doe",
      phone: "0987654321",
      image: "images/driver.png",
    },
    {
      id: "000003",
      name: "Bob Smith",
      phone: "0112233445",
      image: "images/driver.png",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        🚗 Favorite Drivers
      </h2>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {drivers.map((driver) => (
          <div
            key={driver.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          >
            <img
              src={driver.image}
              alt={driver.name}
              className="w-16 h-16 rounded-full border-2 border-green-500 mr-4"
            />
            <div>
              <p className="text-gray-800 font-semibold">
                <span className="font-bold">Name:</span> {driver.name}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">ID:</span> {driver.id}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Call:</span>{" "}
                <a
                  href={`tel:${driver.phone}`}
                  className="text-green-500 hover:underline font-medium"
                >
                  {driver.phone}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteDrivers;
