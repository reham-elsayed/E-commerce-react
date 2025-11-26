import { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useCategories, useProducts } from '@/hooks/useProducts';
import ProductCard from "../ProductCardGeneral/ProductCardGeneral";
import { PriceRangeSlider } from './PriceRangeSlider';
import { CollapsibleFilterSelect } from './FiltersProducts';
import BrandsSlider from './BrandsSlider';

import { useBrands } from '@/hooks/useBrands';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

export default function ProductsPage() {
const[categoriesFilters,setCategoriesFilters]=useState('')
const[priceRange,setPriceRange]=useState([0,1000])
const[brandsFilters,setBrandsFilters]=useState('')
const[brandsSelection,setBrands]=useState([])
const[categoriesSelection,setCategories]=useState([])

  // Fetch ALL products once - no filtering in the hook
  function handlePriceChange(newRange){
    setPriceRange(newRange)
  }
  const { 
    data: allProductsData, 
    isLoading: loadingAll,
  } = useProducts();

  // Extract unique categories
  const { data: categories = [] } = useCategories();
const { data: brands = [] } = useBrands()
useEffect(() => {
  setBrands(brands.map(brand => brand.name.toLowerCase()))
setCategories(categories.map(category => category.name.toLowerCase()))
 
}, [brands, categories])
console.log(allProductsData,"product",categories,"category filter",brands,"brand filter")
  // Apply all filters client-side
  const productsToDisplay = useMemo(() => {
    if (!allProductsData) return [];
    let filteredProducts = allProductsData;
    // Category filtering - one category at a time
   if (categoriesFilters) {
    // 💡 FIX: Convert BOTH strings to lowercase before comparing
    const filterValue = categoriesFilters.toLowerCase();
 filteredProducts = filteredProducts.filter(product => 
        product.category.name.toLowerCase() === filterValue
    );  
}
  if(brandsFilters){
    const brandFilterValue = brandsFilters?.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>product.brand?.name.toLowerCase() === brandFilterValue)
filteredProducts.map(product =>console.log(product.brand,"brand name loop"))

  }

    console.log(brandsFilters,"brand filter ",filteredProducts,"after brand",)

    // Price filtering
    const [min, max] = priceRange || [0,1000];
    console.log(priceRange,"min max")
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && product.price <= max
    );
console.log(filteredProducts,"filtered--------------------")
    return filteredProducts;
  }, [allProductsData, categoriesFilters,priceRange,brandsFilters]);

  // --- Handlers ---
  const handleCategoryChange = (selectedValue) => {
    
    if (selectedValue === '') {
      // Clear all categories
      setCategoriesFilters('');
    } else {
      // Set only one category at a time
      setCategoriesFilters(selectedValue);
    }
  }

  const clearAllFilters = useCallback(() => {
   setCategoriesFilters('');
   setBrandsFilters('')
   setPriceRange([0,1000])
   
  }, []); 
   const handleBrandsChange = (selectedValue) => {
    
    if (selectedValue === '') {
      // Clear all categories
      setBrandsFilters('');
    } else {
      // Set only one category at a time
      setBrandsFilters(selectedValue);
    }
  }

  

  // --- Loading State ---
  if (loadingAll) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg"><Loader/></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
        <BrandsSlider handleBrandsChange={handleBrandsChange}/>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Find the best products for your needs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/55 backdrop-blur-md rounded-sm shadow-sm p-6 sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </Button>
              </div>

              {/* Styled Select for Categories */}
              <div className="mb-6">
           {/* Price Range Slider */}
              <PriceRangeSlider 
                currentRange={priceRange} 
               handlePriceChange={handlePriceChange}
              />
<div className="mb-6">
  <h3 className="font-medium mb-3">Filter by Category</h3>

  {/* Collapsible Container */}
<CollapsibleFilterSelect
  title="Categories" // Title prop
  options={categoriesSelection?categoriesSelection:''} // Full list of categories from your hook
  selectedValues={categoriesFilters} // Current state
  onValueChange={(category) => handleCategoryChange(category)}/>
</div>


              </div>
              <div className="mb-6">
  <h3 className="font-medium mb-3">Filter by Brand</h3>

  {/* Collapsible Container */}
<CollapsibleFilterSelect
  title="Brands" // Title prop
  options={brandsSelection} // Full list of categories from your hook
  selectedValues={brandsFilters} // Current state 
  onValueChange={(brand) => handleBrandsChange(brand)}/>



              </div>

            
            </div>
          </div>
   
          {/* Products Grid */}
          <div className="flex-1 -mt-24">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {productsToDisplay.length} products
              </p>
            </div>

            {/* Products */}
            {productsToDisplay.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching {categoriesFilters} {brandsFilters}</p>
                <Button 
                  onClick={clearAllFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsToDisplay.map(product => (
                  <ProductCard key={product._id} product={product}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}