import Loader from '../Loader/Loader';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from '../ProductCardGeneral/ProductCardGeneral';

export default function FeatureProducts() {


const{data:products,isLoading,isError}=useProducts()
console.log(products)
  
  return (

    <div className='container mx-auto px-4 mb-5'>
     {isError && <div className='text-red-500 text-center'>Error fetching products.</div>}
 
      {isLoading ? <Loader /> : <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2'>

        {products.products?.map((product) => (<ProductCard key={product.id} product={product}/>))}
      </div>
      }
    </div>
    )
}
