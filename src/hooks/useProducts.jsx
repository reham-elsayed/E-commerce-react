// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';

// Fetch all products with optional search parameters
const fetchProducts = async (params) => {
  const { q, category, minPrice, maxPrice, minRating } = params || {};
  
  let url = 'https://dummyjson.com/products';
  
  // Use search endpoint if search query is provided
  if (q) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data = await response.json();
  
  // Apply ALL client-side filtering
  let filteredProducts = data.products;
  
  // Category filtering (supports multiple categories)
//   if (category) {
//     filteredProducts = filteredProducts.filter(product => 
//       product.category.toLowerCase() === category
//     );
//   }
  
  // Price filtering
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  }
  
  // Rating filtering
  if (minRating !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
  }
  
  return {
    ...data,
    products: filteredProducts,
    total: filteredProducts.length
  };
};
// Fetch all categories
const fetchCategories = async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories = await response.json();
  // Extract just the category names from the objects
  return categories.map(category => category.name);
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
};

// Custom hooks
export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};