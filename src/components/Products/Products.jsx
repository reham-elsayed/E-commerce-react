import { Suspense } from 'react'
import { lazy } from 'react';
import VortexSaleSectionWrapper, { GlassCategoryCard } from '../VortexSaleSection/VortexSaleSectionWrapper'
import ProductsPage from './ProductsWithFilters';
const LazyVortex = lazy(() => import("../VortexSaleSection/VortexComponent"));

export default function Products() {
  return (
    <div className="dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        <VortexSaleSectionWrapper>
          < GlassCategoryCard />
          <Suspense fallback={<div className='w-full h-full relative bg-blend-soft-light'></div>}>
            <LazyVortex />
          </Suspense>

        </VortexSaleSectionWrapper>
      
      <ProductsPage/>
    </div>
  )
}
