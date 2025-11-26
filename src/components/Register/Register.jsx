import { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FORM_FIELDS } from '@/lib/formData';
import { FormField } from './FormField';
import { NavLink } from 'react-router-dom';
export default function Register() {
  const [userMessage, setUserMessage]= useState(null)
  const [userError, setUserError]= useState(null)
  const [isLoading, setIsLoading]= useState(false)


  let navigate = useNavigate()
  let mySchema = Yup.object({
    name:Yup.string().required("Name is Required").min(3, "name can't be less than 3 character").max(10, "max is 10 character"),
      email:Yup.string().required("Email required").email("invalid email"),
      password:Yup.string().required("password is required"),

      rePassword:Yup.string().required("write your password again").oneOf([Yup.ref("password")], "password did not match"),

      phone:Yup.string().required(),
  })
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"01090032455",
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
      setUserError(err.response.data.message)
      setIsLoading(false)
    })
  }
  return (
    <>
   <div className="container mx-auto flex flex-col items-center py-16">
  <div className="w-full max-w-md space-y-8">

    {/* Header */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-500 tracking-tight">
        Register Now
      </h1>
      <p className="text-gray-500 mt-2">
        Create a new account to get started
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

    {/* Form Card */}
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 space-y-6 border border-gray-100 dark:border-gray-700"
    >
      {/* Dynamic Form Fields */}
      {FORM_FIELDS.map((field) => (
        <FormField key={field.name} field={field} formik={formik} />
      ))}

      {/* Submit Button */}
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
            Submit
          </button>
        )}
      </div>

      {/* Footer Action */}
      <div className="text-center">
        <NavLink to="/login">
          <button
            type="button"
            className="px-6 py-3 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition"
          >
            Already have an account? Login
          </button>
        </NavLink>
      </div>
    </form>
  </div>
</div>


    </>
  )
}
