// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

// ---------------------------------------------
// Generic fetcher with dynamic params
// ---------------------------------------------
const fetchProducts = async (params = {}) => {
 
  const { data } = await axios.get(`${BASE_URL}/products`, { params });
  
  return data.data; // routeMisr returns: { results, metadata, data[] }
};

// ---------------------------------------------
// Fetch categories
// ---------------------------------------------
const fetchCategories = async () => {
  const { data } = await axios.get(`${BASE_URL}/categories`);
  return data.data.map((cat) => ({
    id: cat._id,
    name: cat.name,
    slug: cat.slug,
    image: cat.image
  }));
};

// ---------------------------------------------
// Fetch products by category
// ---------------------------------------------
const fetchProductsByCategory = async (categoryId, params = {}) => {
  const mergedParams = {
    'category[in]': categoryId,
    ...params
  };

  const { data } = await axios.get(`${BASE_URL}/products`, {
    params: mergedParams
  });

  return data;
};

// ---------------------------------------------
// React Query Hooks
// ---------------------------------------------

// All products with filtering/pagination support
export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 300000, // 5 min
  });
};

// All categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 600000, // 10 min
  });
};

// Products filtered by one category
export const useProductsByCategory = (categoryId, params = {}) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId, params],
    queryFn: () => fetchProductsByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 300000,
  });
};
