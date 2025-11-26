import { useState, useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext';
import { NavLink } from 'react-router-dom';

export default function Login() {
  let {token, setToken} = useContext(TokenContext)
  console.log(token)
  const [userMessage, setUserMessage]= useState(null)
  const [userError, setUserError]= useState(null)
  const [isLoading, setIsLoading]= useState(false)


  let navigate = useNavigate()
  let mySchema = Yup.object({
      email:Yup.string().required("Email required").email("invalid email"),
      password:Yup.string().required("password is required"),
  })
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{(loginForm(values))}
  })
  async function loginForm(values){
    setIsLoading(true)
    return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).then((data)=>{
      console.log("data submitted",data.data.message)
      setUserMessage(data.data.message)
     setToken(data.data.token)
     localStorage.setItem("token",data.data.token )
     setIsLoading(false)
      navigate("/home")
    
    }).catch((err)=>{console.log(err.response.data.message)
      setIsLoading(false)
      setUserError(err.response.data.message)
    
    })
  }
  function handleforget(){
    navigate("/forgotpassword");
  }
 
  return (
    <>
    <div className="container mx-auto flex flex-col items-center py-16">

  <div className="w-full max-w-md space-y-8">

    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-500 tracking-tight">
        Welcome Back
      </h1>
      <p className="text-gray-500 mt-2">
        Sign in to manage your account
      </p>
    </div>

    {/* Success Message */}
    {userMessage && (
      <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
        {userMessage}
      </div>
    )}

    {/* Error Message */}
    {userError && (
      <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
        {userError}
      </div>
    )}

    <form
      onSubmit={formik.handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100 dark:border-gray-700"
    >
      {/* Name */}
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          
Email        </label>

    <input
  id="email"
  name="email"
  type="email"
  autoComplete="email"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.email}
  placeholder="write your email"
  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
/>

        {formik.touched.email && formik.errors.email && (
          <p className="text-red-600 text-sm">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="password ..."
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-600 text-sm">{formik.errors.password}</p>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2">
        {isLoading ? (
          <button
            type="button"
            aria-label="Loading"
            className="w-full py-3 rounded-xl bg-green-600 text-white font-medium flex justify-center items-center gap-2 cursor-not-allowed"
          >
            <i className="fa fa-spinner fa-spin"></i> Processing…
          </button>
        ) : (
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={`w-full py-3 rounded-xl text-white font-semibold transition 
              ${
                formik.isValid && formik.dirty
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-200 cursor-not-allowed"
              }`}
          >
            Login
          </button>
        )}
      </div>

      <div className="text-center">
        <NavLink to="/signup">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition"
          >
            Create new account
          </button>
        </NavLink>
      </div>
    </form>
  </div>
</div>

    </>
  )
}
