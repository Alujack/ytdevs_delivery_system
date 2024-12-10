import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-orange-600 px-2 py-2">
      <div className="flex items-center space-x-2">
        <Image src="/images/YTDEvs_icon.png" width={65} height={65} alt='delivery icon'></Image>
      </div>
      <nav className="flex items-center space-x-6">
        {/* Each Icon */}

        <Link href="/" className="flex flex-col justify-center items-center ">
          <div className="h-7 w-7">
            <img src="/images/icons/Shopping_cart.png" className="object-cover" />
          </div>
          <span>Store</span></Link>


        <Link href="/track" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7"><img src="/images/icons/Map.png" className="object-cover" /></div>
          <span>Map</span></Link>


        <Link href="/store_member" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7"><img src="/images/icons/agency.png" className="object-cover" /></div>
          <span>Store Member</span></Link>


        <Link href="/driver-member" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7">
            <img src="/images/driver.png" className="object-cover" />
          </div>
          <span>Driver Member</span></Link>
        <Link href="/customer" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7"><img src="/images/icons/customer.png" className="object-cover" /></div>
          <span>Customer</span></Link>


        <Link href="/" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7">
            <img src="/images/icons/inventory.png" className="object-cover" />
          </div>
          <span>Inventory</span></Link>


        <Link href="/" className="flex flex-col justify-center items-center0 ">
          <div className="h-7 w-7"><img src="/images/icons/dashboard.png" className="object-cover" /></div>
          <span>DashBoard</span></Link>


        <Link href="/" className="flex flex-col justify-center items-center  ">
          <div className="h-7 w-7">
            <img src="/images/icons/Notification.png" className="object-cover" />
          </div>
          <span>Notifications</span></Link>

      </nav>



    </header>
  );
};

export default Header;
