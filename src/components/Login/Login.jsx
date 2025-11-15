import React from 'react'
import styles from "./Login.module.css"
import { useState, useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext';
import { Helmet } from "react-helmet";

export default function Login() {
  let { token, setToken } = useContext(TokenContext)
  console.log(token)
  const [userMessage, setUserMessage] = useState(null)
  const [userError, setUserError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  let navigate = useNavigate()
  let mySchema = Yup.object({
    email: Yup.string().required("Email required").email("invalid email"),
    password: Yup.string().required("password is required"),
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => { (loginForm(values)) }
  })
  async function loginForm(values) {
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data) => {
      console.log("data submitted", data.data.message)
      setUserMessage(data.data.message)
      setToken(data.data.token)
      localStorage.setItem("token", data.data.token)
      setIsLoading(false)
      navigate("/home")

    }).catch((err) => {
      console.log(err.response.data.message)
      setIsLoading(false)
      setUserError(err.response.data.message)

    })
  }
  function handleforget() {
    navigate("/forgotpassword");
  }
  return (
    <>
      <div className='container mx-auto md:py-20'>
        <h1 className="text-5xl mb-5 text-green-400">Login Now :</h1>
        {userMessage ? <div className="md:p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-lime-50">
          {userMessage}
        </div> : null
        }
        {userError ? <div className="md:p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-50">
          {userError}
        </div> : null
        }

        <form onSubmit={formik.handleSubmit} className='border-b-2 my-3'>

          <div className=''>
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



          <div className='text-right my-5'>
            {isLoading ? <button type="button" aria-label="Loading" className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <i className="fa fa-spinner fa-spin"></i>
            </button> :
              <button type="submit"
                disabled={!(formik.isValid && formik.dirty)}
                className={`text-white ${formik.isValid && formik.dirty ? 'bg-green-700' : 'bg-green-200'} hover:bg-hove-800 focus:ring-4 focus:outline-none focus:ring-hover-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>Login</button>
            }
          </div>
        </form>

        <button type="button"
          onClick={handleforget}
          className={`text-white bg-green-700 hover:bg-hove-800 focus:ring-4 focus:outline-none focus:ring-hover-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>ForgotPassword?</button>

      </div>
    </>
  )
}
