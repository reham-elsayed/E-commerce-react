import React, { useContext, useEffect } from 'react'
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import { Offline, Online } from "react-detect-offline";
import { ThemeContext } from '../../../context/ThemeContext'
import { Footer } from '../Footer/Footer';
export default function Layout() {
  let { theme } = useContext(ThemeContext)
  useEffect(() => {
    if (theme == 'dark') {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])
  return (
    <>
      <div className='relative '>

        <Navbar />

        <Outlet />
<Footer/>

        <Online><div className="fixed bottom-5 left-1 p-3 rounded-md text-white bg-green-300  border-pink-700">Back Online!</div></Online>

        <Offline><div className="fixed bottom-5 left-1 p-3 rounded-md text-white bg-gray-800  border-gray-700">No internet connection!</div></Offline>
      </div>
    </>
  )
}
