// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';

// Fetch all products with optional search parameters
const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
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
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
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