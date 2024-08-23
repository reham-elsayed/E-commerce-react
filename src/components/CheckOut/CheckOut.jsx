import React, { useEffect } from 'react'
import styles from "./CheckOut.module.css"
import { useState, useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext';
import { CartContext } from '../../../context/CartContext';

import {Helmet} from "react-helmet";
export default function CheckOut() {
const [paymentType, setPaymentType] = useState(null)
let {onLinePayment, cashPayment} = useContext(CartContext);
let {state} = useLocation()
useEffect(()=>{
  setPaymentType(state.type)
},[])
  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    },
    
    onSubmit:(values)=>{handleOnlinePayment(values)}
  })
async function handleOnlinePayment(values){
  if(paymentType == "online Payment"){
    onLinePayment(values)
    console.log("online payment function")
  }else{
    cashPayment(values)
  console.log("cash payment function")
  }

}


  return (
    <div className="w-1/2 mx-auto">
      <h1>{paymentType}</h1>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
            </Helmet>
      <form onSubmit={formik.handleSubmit}>
 
 <div className='my-5'>
     <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details</label>
     <input
     name="details"
     type="text"
     id="details"
     onChange={formik.handleChange}
     value={formik.values.details}
     onBlur={formik.handleBlur}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
  {formik.touched.details && formik.errors.details ? (
<div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.details}</div>
) : null}
 </div>
 <div className='my-5'>
     <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
     <input
     name="phone"
     type="tel"
     id="phone"
     onChange={formik.handleChange}
     value={formik.values.phone}
     onBlur={formik.handleBlur}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
 {formik.touched.phone && formik.errors.phone ? (
<div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.phone}</div>
) : null}
 </div>
 <div className='my-5'>
     <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
     <input
     name="city"
     type="text"
     id="city"
     onChange={formik.handleChange}
     value={formik.values.city}
     onBlur={formik.handleBlur}
     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />
 {formik.touched.city && formik.errors.city ? (
<div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.city}</div>
) : null}
 </div>



<div className='text-right my-5'>

<button type="submit"
disabled={!(formik.isValid && formik.dirty)}
className={`text-white ${formik.isValid && formik.dirty?'bg-green-700':'bg-green-200'} hover:bg-hove-800 focus:ring-4 focus:outline-none focus:ring-hover-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Pay Now</button>

</div>
</form>
    </div>
  )
}
