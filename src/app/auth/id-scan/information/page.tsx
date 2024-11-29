import React from "react";

const InfoScreen = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Your Information</h1>
      <div className="text-gray-800 space-y-4">
        <p>
          <span className="font-semibold">Name:</span> Yang Sokheang
        </p>
        <p>
          <span className="font-semibold">Birth Place:</span> Takeo
        </p>
        <p>
          <span className="font-semibold">Date of birth:</span> 10/10/2004
        </p>
        <p>
          <span className="font-semibold">Id Number:</span> 02134341444
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span> 0 12 342 653
        </p>
        <p>
          <span className="font-semibold">Current address:</span> 113st/Toul
          Kork/Phnom Penh
        </p>
        <p>
          <span className="font-semibold">Position:</span> Driver
        </p>
      </div>
      <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600">
        Register now
      </button>
    </div>
  );
};

export default InfoScreen;
