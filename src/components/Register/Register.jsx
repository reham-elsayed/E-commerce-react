import React from 'react'
import { useState } from 'react';
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [userMessage, setUserMessage]= useState(null)
  const [userError, setUserError]= useState(null)
  const [isLoading, setIsLoading]= useState(false)


  let navigate = useNavigate()
  let mySchema = Yup.object({
    name:Yup.string().required("Name is Required").min(3, "name can't be less than 3 character").max(10, "max is 10 character"),
      email:Yup.string().required("Email required").email("invalid email"),
      password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/, "password not valid"),

      rePassword:Yup.string().required("write your password again").oneOf([Yup.ref("password")], "password did not match"),

      phone:Yup.string().required().matches(/^[0-9]{11}$/, "phone is not valid"),
  })
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{(registration(values))}
  })
  async function registration(values){
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).then((data)=>{
      console.log("data submitted",data.data.message)
      setUserMessage(data.data.message)
     
      navigate("/login")
      setIsLoading(false)
    }).catch((err)=>{console.log(err.response.data)
      setUserError(err.response.data.errors.message)
      setIsLoading(false)
    })
  }
  //asasas@gmn.com
  return (
 <>
 <div className='container mx-auto my-20'>
  <h1 className="text-5xl mb-5 text-green-400">Register Now :</h1>
 {userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-lime-50">
  {userMessage}
  </div>:null
   }
   {userError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-50">
  {userError}
  </div>:null
   }
 
 <form onSubmit={formik.handleSubmit}>
  <div className='my-5'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
            <input
            name="name"
            type="text"
            id="name"
            onChange={formik.handleChange} 
            value={formik.values.name}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
             {formik.touched.name && formik.errors.name ? (
      <div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.name}</div>
    ) : null}
        </div>
        <div className='my-5'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
            <input
            name="email"
            type="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
         {formik.touched.email && formik.errors.email ? (
      <div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.email}</div>
    ) : null}
        </div>
        <div className='my-5'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
            <input
            name="password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.password && formik.errors.password ? (
      <div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.password}</div>
    ) : null}
        </div>
        <div className='my-5'>
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">re password</label>
            <input name="rePassword"
             onChange={formik.handleChange}
             value={formik.values.rePassword}
             onBlur={formik.handleBlur}
            type="password" id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.rePassword && formik.errors.rePassword? (
      <div className=" bg-red-200  border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.rePassword}</div>
    ) : null}
        </div>
        <div className='my-5'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
            <input name="phone" 
             onChange={formik.handleChange}
             value={formik.values.phone}
             onBlur={formik.handleBlur}
            type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {formik.touched.phone && formik.errors.phone ? (
      <div className=" bg-red-200 border-2 border-red-400 px-5 py-2 rounded-md m-1">{formik.errors.phone}</div>
    ) : null}
        </div>
 
 <div className='text-right my-5'>
  {isLoading?<button type="button" aria-label="Loading" className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
  <i className="fa fa-spinner fa-spin"></i>
</button>:
 <button type="submit"
 disabled={!(formik.isValid && formik.dirty)}
  className={`text-white  hover:bg-hove-800 focus:ring-4 focus:outline-none focus:ring-hover-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${formik.isValid && formik.dirty?'bg-green-700':'bg-green-200'} `}>Submit</button>
  }
 </div>
 </form>
 </div>
 </>
  )
}
