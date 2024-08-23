import React from 'react'
import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes(props) {
  if(localStorage.getItem("token")){
    return props.children
  }
  else{
    return (
     <Navigate to="/login" />
    )
  }
 
}
