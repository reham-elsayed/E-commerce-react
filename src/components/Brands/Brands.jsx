import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";

import { useBrands } from '@/hooks/useBrands';
export default function Brands() {
const{data: brands,isLoading}=useBrands()

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