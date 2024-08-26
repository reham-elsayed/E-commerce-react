import React from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Foot from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
   <>
<div className='dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
     <Navbar />
     <div className="container mx-auto px-10">
      
     <Outlet />
     </div>
   
    <Foot />
    <Offline><div className="fixed bottom-5 left-1 p-3 rounded-md text-white bg-gray-800  border-gray-700">No internet connection!</div></Offline>
    </div>
   </>
  )
}
