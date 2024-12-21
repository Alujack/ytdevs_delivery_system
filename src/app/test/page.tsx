import React from 'react';

interface DeliveryItem {
  id: number;
  image: string;
  status: string;
  date: string;
  time: string;
  from: string;
  to: string;
}

const deliveryItems: DeliveryItem[] = [
  {
    id: 1,
    image: '/images/driver.png', 
    status: 'Delivered',
    date: '10/12/24',
    time: '1:30 AM - 1:45 AM',
    from: 'Peijing Restaurant',
    to: 'User ID-12345112',
  },
  {
    id: 2,
    image: '/images/driver.png', 
    status: 'Delivered',
    date: '10/12/24',
    time: '1:30 AM - 1:45 AM',
    from: 'Peijing Restaurant',
    to: 'User ID-12345112',
  },
];

const DeliveryPage: React.FC = () => {
  return (
    <div className=" h-screen p-4 font-sans bg-white">
      {deliveryItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center border border-gray-300 rounded-lg mb-4 overflow-hidden shadow-md"
        >
          <img
            src={item.image}
            alt="Delivery item"
            className="w-24 h-24 object-cover"
          />
          <div className="p-2 flex-1">
            <p className="m-0 font-bold text-gray-800">{item.status}</p>
            <p className="my-1 text-gray-600">Date: {item.date}</p>
            <p className="my-1 text-gray-600">Time: {item.time}</p>
            <p className="my-1 text-gray-600">From: {item.from}</p>
            <p className="my-1 text-gray-600">To: {item.to}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryPage;
