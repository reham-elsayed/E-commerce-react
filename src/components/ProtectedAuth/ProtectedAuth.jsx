import React from 'react'
import styles from "./ProtectedAuth.module.css"
export default function ProtectedAuth(props) {
if(localStorage.getItem("token")){
  return <Navigate to="/"></Navigate>
}else{
return props.children
}
 
}
