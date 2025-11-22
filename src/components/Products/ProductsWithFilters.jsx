import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Input from '../ui/input'; // Retained only for potential future use, though currently commented out
import { useCategories, useProducts, useProductsByCategory } from '@/hooks/useProducts';
// Note: ProductCard definition is provided separately below for clarity.
import ProductCard from "../ProductCardGeneral/ProductCardGeneral";

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    categories: [], // Only need the categories array for this version
  });

  // --- Fetching Logic ---
  const selectedCategory = filters.categories.length === 1 ? filters.categories[0] : null;

  // 1. Fetch products by a single selected category (if one is selected)
  const { 
    data: categoryData, 
    isLoading: loadingCategory,
  } = useProductsByCategory(selectedCategory);

  // 2. Fallback: Fetch all products (if no category is selected, i.e., selectedCategory is null)
  const { 
    data: allProductsData, 
    isLoading: loadingAll,
  } = useProducts({ 
    enabled: selectedCategory === null,
  });

  // Determine the final list of products to display
  const productsToDisplay = useMemo(() => {
    // If one category is selected, use the results from useProductsByCategory
    if (selectedCategory && categoryData?.products) {
      return categoryData.products;
    }
    // If no category is selected, use the results from the general useProducts hook
    if (selectedCategory === null && allProductsData?.products) {
      return allProductsData.products;
    }
    // If filters.categories has MORE than 1 item, we can't use the single-category endpoint, so return none for now.
    // If the data hasn't loaded, return an empty array.
    return [];
  }, [selectedCategory, categoryData, allProductsData]);
  
  // Extract unique categories (for filter sidebar)
  const { data: categories = [] } = useCategories();

  // --- Handlers ---
  const handleCategoryToggle = (category) => {
    setFilters(prev => {
      let newCategories;
      
      // If the category is already selected, remove it.
      if (prev.categories.includes(category)) {
        newCategories = prev.categories.filter(c => c !== category);
      } else {
        // If a new category is selected, we only support ONE at a time for the useProductsByCategory hook.
        // So, we replace the existing selection with the new one.
        newCategories = [category];
      }

      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({ categories: [] });
  };
  
  const isLoading = selectedCategory ? loadingCategory : loadingAll;
  
  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Find the best products for your needs</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
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

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories (Select One)</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        // Check if this category is the one currently selected
                        checked={filters.categories[0] === category} 
                        onChange={() => handleCategoryToggle(category)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm capitalize"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {productsToDisplay.length} products
              </p>
            </div>

            {/* Products */}
            {productsToDisplay.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
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
        <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}