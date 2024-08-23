import React from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
export default function Layout() {
  return (
   <>
<div className='dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
     <Navbar />
     <div className="container mx-auto px-10">
      
     <Outlet />
     </div>
   
    <Footer />
    </div>
   </>
  )
}
