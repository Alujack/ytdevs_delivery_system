'use client'
import React from "react"
import Topbar from "@/components/topbar";
import Sidebar from "@/components/sidebar";

export default function Adminlayout({ children, }:{children:React.ReactNode}) {
 return (
   <>  
     <div className="w-full">
        <div className="flex flex-row">
             <Sidebar/>
              <div className="flex-1 md:self-stretch">
                 <Topbar />
                <div className="scrollable-div bg-white-A700 rounded-xl p-10">{children}</div>
              </div>
          </div>
      </div>  
   </>
  )
}