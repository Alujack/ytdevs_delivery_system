import React from 'react';

const Topbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-gray-200 px-4 border-b border-gray-400">
      {/* Left Section */}
      <div></div> 
      {/* Right Section */}
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 font-medium">Admin</span>
        <img
          src="/images/driver.png" 
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
