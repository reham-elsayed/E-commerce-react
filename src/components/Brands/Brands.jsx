import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios'
import styles from "./Brands.module.css"
import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";

import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom'
export default function Brands() {
const [displaySpecificCategory, setDisplaySpecificCategory] = useState({})
const [isClicked, setIsClicked] = useState(false)
  function getCategoryProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
let {data, isError, isLoading, error}= useQuery({
  queryKey:["categoryProducts"],
  queryFn:getCategoryProducts,
  staleTime:1000,
 
})
 function handleDisplay(id){
  console.log("clicked category")
  let filteredData = data?.data.data.filter((item)=>item._id === id)
  setDisplaySpecificCategory(filteredData[0])
  console.log(displaySpecificCategory)
  setIsClicked(true)
  console.log(isClicked)
}
function handleNotToDisplay(){
  setIsClicked(false)
}
  return (
    <div className='container mx-auto px-4 '>
    {isLoading?<Loader/>:
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
{data?.data.data.map((product)=>(
  <div onClick={()=>handleDisplay(product._id)} key={product._id} className="cart flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
        <img className="rounded-t-lg w-full h-5/6" src={product.image} alt="" />
  
    <div className="flex h-1/6 justify-center items-center">
       
    <h5 
      className=" text-2xl tracking-tight text-green-700 dark:text-white">
      {product.name}
    </h5>    
    </div>
   
   
</div>

))}
  </div>
}
{isClicked?
 <div 
 onClick={()=>handleNotToDisplay(displaySpecificCategory._id)} 
 key={displaySpecificCategory._id} 
 className="pt-20 fixed top-0 left-0 right-0 bottom-0 flex   justify-center items-center bg-black bg-opacity-85  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 <div className="container mx-auto px-20 h-[300px] w-[400px]">
   <img className="rounded-t-lg w-full h-[300px]" src={displaySpecificCategory.image} alt={displaySpecificCategory.name} />

<div className="flex h-1/6 justify-center items-center">
  
<h5 
 className=" text-2xl tracking-tight text-green-700 dark:text-white">
 {displaySpecificCategory.name}
</h5>    
   </div>

</div>


</div>: null}
    </div>
  )
}