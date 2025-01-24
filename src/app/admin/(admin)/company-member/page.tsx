"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DetailModal from "@/components/models/detail-cutomer"
import { useEffect, useState } from "react";
import axios from "axios";



export interface Company  {
  id:number;
  profile: string; 
  owner: string;   
  store_id: string; 
  phone_number: string;
  email: string; 
  balance: number; 
  location: string; 
  action: string; 
};


export default function TableDemo() {
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [companys, setCompanys ] = useState<Company[]>(
    [{
      id:0,
      profile: "",
      owner: "",
      store_id: "",
      phone_number: "",
      email: "",
      balance: 0,
      location: "",
      action: ""
    }]);

  const [data, setData] = useState<Company>({
      id:0,
      profile: "",
      owner: "",
      store_id: "",
      phone_number: "",
      email: "",
      balance: 0,
      location: "",
      action: ""});
  const handleIsClose=()=> {
    setIsOpen(false)
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const data = await axios.get<Company[]>('https://coding-fairy.com/api/mock-api-resources/express-delivery/company');
      if(data){
        setCompanys(data.data)
      }
       console.log("company data", companys);
    }
    fetch()

  }, [companys])
   const handleUpdate = (updatedData:any) => {
    setData(updatedData);
  };

  const handleDelete =  () => {
    const res = axios.delete(`https://coding-fairy.com/api/mock-api-resources/express-delivery/company${id}`)

  };

  return (
    <div className='h-screen'>
      <DetailModal
        isOpen={isOpen}
        isClose={handleIsClose}
        data={ data }
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] px-10">Profile</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Store Id</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companys.map((store) => (
            <TableRow key={store.email} onClick={()=>{
              setId(store.id)
              setData(store);
              console.log(data);
              setIsOpen(true)
              }}>
              <TableCell className="px-10">
                {/* <Image src={store.profile} width={90} height={90} alt="profile" /> */}
              </TableCell>
              <TableCell>{store.owner}</TableCell>
              <TableCell>{store.store_id}</TableCell>
              <TableCell>{store.phone_number}</TableCell>
              <TableCell>{store.email}</TableCell>
              <TableCell>{store.location}</TableCell>
              <TableCell>{store.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table></div>
  )
}
