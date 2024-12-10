import React from 'react';

// Define the type for the store data
type Store = {
  profile: string;
  ownerName: string;
  storeId: string;
  phoneNumber: string;
  email: string;
  location: string;
  status: 'online' | 'offline';
};

// Sample data
const stores: Store[] = [
  {
    profile: 'happyshop.png',
    ownerName: 'Chan David',
    storeId: '000001',
    phoneNumber: '0 12 321 623',
    email: 'happyshop@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: 'organicgrocery.png',
    ownerName: 'Rith Somnang',
    storeId: '000002',
    phoneNumber: '0 12 321 625',
    email: 'organicgrocery@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: 'fauget.png',
    ownerName: 'Pan Borey',
    storeId: '000003',
    phoneNumber: '0 12 321 627',
    email: 'fauget@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: 'chompa.png',
    ownerName: 'Thai Seyha',
    storeId: '000004',
    phoneNumber: '0 12 321 628',
    email: 'chompa@gmail.com',
    location: '11.58964, 104.8708',
    status: 'offline',
  },
  {
    profile: 'ogotextherf.png',
    ownerName: 'Prak Panha',
    storeId: '000005',
    phoneNumber: '0 12 321 629',
    email: 'ogotextherf@gmail.com',
    location: '11.58964, 104.8708',
    status: 'offline',
  },
];

const StoreTable: React.FC = () => {
  return (
    <div style={{height:'100vh', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Profile</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Store Owner Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Store ID</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Location</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr key={index}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                <img src={`/images/${store.profile}`} alt={store.ownerName} style={{ width: '40px', height: '40px' }} />
              </td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{store.ownerName}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{store.storeId}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{store.phoneNumber}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{store.email}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{store.location}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                <span
                  style={{
                    color: store.status === 'online' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {store.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreTable;
