import {  useState} from 'react';
import axios from 'axios'
import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";

import { useQuery } from '@tanstack/react-query';
import { useBrands } from '@/hooks/useBrands';
export default function Brands() {
const [displaySpecificCategory, setDisplaySpecificCategory] = useState({})
const{data: brands,isLoading}=useBrands()
//  function handleDisplay(id){
//   console.log("clicked category")
//   let filteredData = data?.data.data.filter((item)=>item._id === id)
//   setDisplaySpecificCategory(filteredData[0])
//   console.log(displaySpecificCategory)
//   setIsClicked(true)
//   console.log(isClicked)
// }
// function handleNotToDisplay(){
//   setIsClicked(false)
// }
  return (
    <div className='container mx-auto px-4 '>
    {isLoading?<Loader/>:
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
{brands.map((product)=>(
  <div  key={product.name} className="cart flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className={`min-h-[100px] h-5/6 bg-indigo-100 bg-gradient-to-green rounded-lg `}>

        <img className="rounded-t-lg w-full" src={product.image} alt={product.name} />
  </div>
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
    </div>
  )
}