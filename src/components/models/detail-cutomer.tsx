import { Company } from '@/app/admin/(admin)/company-member/page';
import Image from 'next/image';
import React from 'react';


interface ModalProps {
  isOpen: boolean;
  isClose: () => void;
  data: Company;
  onUpdate: (updatedData: Company) => void;
  onDelete: () => void;
}

const DetailModal: React.FC<ModalProps> = ({ isOpen, isClose, data, onUpdate, onDelete }) => {
  // const [data, setFormData] = useState<Company>(data);
  console.log("data in modal",data)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={isClose}
            >
              ❌
            </button>
            <div className="text-2xl font-bold text-orange-500 mb-5">Detail</div>
            <div className="flex justify-between">
              <div className="text-center mr-5">
                <Image
                  src={data.profile}
                  alt="Profile"
                  className="w-36 h-36 rounded-lg border border-orange-500"
                />
                <div className="mt-2 text-lg">Photo</div>
              </div>
              <div className="grid grid-cols-2 gap-5 w-full">
                <div className="flex flex-col">
                  <label>Owner</label>
                  <input
                    type="text"
                    name="owner"
                    value={data.owner}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Store ID</label>
                  <input
                    type="text"
                    name="store_id"
                    value={data.store_id}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={data.phone_number}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Balance</label>
                  <input
                    type="number"
                    name="balance"
                    value={data.balance}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    className="p-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5 space-x-3">
              <button className="bg-blue-400 text-white p-2 rounded-md" onClick={() => onUpdate}>
                Save
              </button>
              <button className="bg-red-500 text-white p-2 rounded-md" onClick={onDelete}>
                Delete
              </button>
              <button className="bg-gray-500 text-white p-2 rounded-md" onClick={isClose}>
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
