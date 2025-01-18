"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import DetailModal from "@/components/models/detail-cutomer";
import { useState } from "react";
import { useRouter } from "next/navigation";

const store = [
  {
    profile: '/images/driver.png',
    ownerName: 'Chan David',
    storeId: '000001',
    phoneNumber: '0 12 321 623',
    email: 'happyshop@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: '/images/driver.png',
    ownerName: 'Rith Somnang',
    storeId: '000002',
    phoneNumber: '0 12 321 625',
    email: 'organicgrocery@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: '/images/driver.png',
    ownerName: 'Pan Borey',
    storeId: '000003',
    phoneNumber: '0 12 321 627',
    email: 'fauget@gmail.com',
    location: '11.58964, 104.8708',
    status: 'online',
  },
  {
    profile: '/images/driver.png',
    ownerName: 'Thai Seyha',
    storeId: '000004',
    phoneNumber: '0 12 321 628',
    email: 'chompa@gmail.com',
    location: '11.58964, 104.8708',
    status: 'offline',
  },
  {
    profile: '/images/driver.png',
    ownerName: 'Prak Panha',
    storeId: '000005',
    phoneNumber: '0 12 321 629',
    email: 'ogotextherf@gmail.com',
    location: '11.58964, 104.8708',
    status: 'offline',
  },
];

export default function TableDemo() {
  const [show, setShow] = useState(false);
  const router = useRouter()
  const isShow = ()=>{
    setShow(true);
  
  }
  const isClose = ()=>{
    setShow(false);
   
  }
  return (
    <div className='h-screen'>
      <button onClick={()=> router.back()}>back</button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] px-10">Profile</TableHead>
            <TableHead>Owner Name</TableHead>
            <TableHead>Store Id</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.map((store) => (
            <TableRow key={store.email}>
              <TableCell className="px-10"><button onClick={isShow}><Image  src={store.profile} width={90} height={90} alt="profile" /></button></TableCell>
              <TableCell>{store.ownerName}</TableCell>
              <TableCell>{store.storeId}</TableCell>
              <TableCell>{store.phoneNumber}</TableCell>
              <TableCell>{store.email}</TableCell>
              <TableCell>{store.location}</TableCell>
              <TableCell>{store.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
      </div>
  )
}
