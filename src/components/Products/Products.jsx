import { Suspense } from 'react'
import { lazy } from 'react';
import VortexSaleSectionWrapper, { GlassCategoryCard, VortexFallback } from '../VortexSaleSection/VortexSaleSectionWrapper'
import ProductsPage from './ProductsWithFilters';
const LazyVortex = lazy(() => import("../VortexSaleSection/VortexComponent"));

export default function Products() {
  return (
    <div className="dark:text-white bg-background dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        <VortexSaleSectionWrapper>
          < GlassCategoryCard />
          <Suspense fallback={<VortexFallback/>}>
            <LazyVortex />
          </Suspense>

        </VortexSaleSectionWrapper>
      
      <ProductsPage/>
    </div>
  )
}
