// hooks/useBrands.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/products';

// Fetch **all pages** and aggregate brands
async function fetchBrandsWithImages() {
  // 1) Fetch page 1 to know numberOfPages
  const page1 = await axios.get(BASE_URL);
  const { numberOfPages } = page1.data.metadata;

  // 2) Fetch remaining pages in parallel
  const pageRequests = [];
  for (let page = 2; page <= numberOfPages; page++) {
    pageRequests.push(axios.get(`${BASE_URL}?page=${page}`));
  }

  const allResponses = [page1, ...(await Promise.all(pageRequests))];

  // 3) Flatten all products into a single array
  const allProducts = allResponses.flatMap((res) => res.data.data);

  // 4) Group by brand
  const brandsMap = allProducts.reduce((acc, product) => {
    const brand = product.brand;
    if (!brand?._id) return acc;

    if (!acc[brand._id]) {
      acc[brand._id] = {
        id: brand._id,
        name: brand.name,
        slug: brand.slug,
        image: brand.image,        // representative brand image
        productCount: 0
      };
    }

    acc[brand._id].productCount += 1;
    return acc;
  }, {});

  return Object.values(brandsMap).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrandsWithImages,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
}


// Hook to get products by specific brand
export function useProductsByBrand(brandName) {
  return useQuery({
    queryKey: ['products', 'brand', brandName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE_URL}/products/search?q=${encodeURIComponent(brandName)}`
      );
      return data.products;
    },
    enabled: !!brandName, // Only fetch if brandName is provided
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}