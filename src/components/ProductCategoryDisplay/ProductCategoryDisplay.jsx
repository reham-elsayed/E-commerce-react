import React from 'react'
import styles from "./ProductCategoryDisplay.module.css"
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
export default function ProductCategoryDisplay() {
  let { id } = useParams()
  function getCategorySpecificProducts(){
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }
let {data, isError, isLoading, error}= useQuery({
  queryKey:["categorySpecificProducts"],
  queryFn:getCategorySpecificProducts,
  staleTime:1000,
 
})
console.log(data)
  return (
    <div className='container mx-auto px-4 '>
    {isLoading?<Loader/>:<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
      
{data?.data.data.map((product)=>(
  <div key={product._id} className="card flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`/productCategoryDisplay/${product._id}`}>
        <img className="rounded-t-lg w-full h-5/6" src={product.image} alt="" />
  
    <div className="flex h-1/6 justify-center items-center">
       
    <h5 
      className=" text-2xl tracking-tight text-green-700 dark:text-white">
      {product.name}
    </h5>    
    </div>
    </Link>
   
</div>

))}
  </div>
}
    </div>
  )
}
