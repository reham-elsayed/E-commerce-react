import React from 'react'
import styles from "./Not-found.module.css"
import Notfound from "./../../assets/error.svg"


export default function NotFound() {
  return (
    <>
    <div className="container mx-auto text-center"></div>
    <img src={Notfound} className="w-full" alt="not found"/>
    </>
  )
}
