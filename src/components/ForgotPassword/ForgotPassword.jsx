
import React from 'react'
import styles from "./ForgotPassword.module.css"
import { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword(){
    const [userMessage, setUserMessage]= useState(null)
    const [userError, setUserError]= useState(null)
    const [isLoading, setIsLoading]= useState(false)
  
  let othernavigate = useNavigate()
    let navigate = useNavigate()
    let mySchema = Yup.object({
        email:Yup.string().required("Email required").email("invalid email"),
    })

    let formik = useFormik({
        initialValues:{
          email:"",
        },
        validationSchema:mySchema,
        onSubmit:(values)=>{(forgotPassword(values))}
      })

      async function forgotPassword(values){
        setIsLoading(true)
        return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(()=>{
          othernavigate("/resetpassword")
          setIsLoading(false)
       } ).catch((err)=>{console.log(err.message)
          setUserError(err.message)
          setIsLoading(false)
        })
      }

    return (
        <>
     <div className='container mx-auto'>
      <h1 className="text-5xl mb-5 text-green-400">Enter Email to send reset code :</h1>
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

     <div className='text-right my-5'>
      {isLoading?<button type="button" aria-label="Loading" className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      <i className="fa fa-spinner fa-spin"></i>
    </button>:
     <button type="submit"
     disabled={!(formik.isValid && formik.dirty)}
      className={`text-white ${formik.isValid && formik.dirty?'bg-green-700':'bg-green-200'} hover:bg-hove-800 focus:ring-4 focus:outline-none focus:ring-hover-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>send reset code</button>
      }
     </div>
     </form>
     </div>
     </>
      )
}