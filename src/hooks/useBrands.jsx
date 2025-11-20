// hooks/useBrands.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const DUMMYJSON_BASE_URL = 'https://dummyjson.com';

// Fetch all brands with their representative images
async function fetchBrandsWithImages() {
  const { data } = await axios.get(`${DUMMYJSON_BASE_URL}/products?limit=100`);
  
  // Group products by brand and get first image for each brand
  const brandsMap = data.products.reduce((acc, product) => {
    if (!product.brand) return acc;
    
    if (!acc[product.brand]) {
      acc[product.brand] = {
        name: product.brand,
        image: product.thumbnail || product.images?.[0] || '',
        productCount: 0
      };
    }
    
    acc[product.brand].productCount += 1;
    console.log(acc)
    return acc;

  }, {});

  return Object.values(brandsMap).sort((a, b) => a.name.localeCompare(b.name));
}

// Hook to get all brands with images
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrandsWithImages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook to get products by specific brand
export function useProductsByBrand(brandName) {
  return useQuery({
    queryKey: ['products', 'brand', brandName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${DUMMYJSON_BASE_URL}/products/search?q=${encodeURIComponent(brandName)}`
      );
      return data.products;
    },
    enabled: !!brandName, // Only fetch if brandName is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}