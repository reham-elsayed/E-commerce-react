import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // Example icon for visual flare

// 1. Prepare the Top 10 Brands Data
const TOP_BRANDS = [
  { name: 'Rolex', image: 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/thumbnail.webp' },
  { name: 'Apple', image: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp' },
  { name: 'Nike', image: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp' },
  { name: 'Chanel', image: 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp' },
  { name: 'Dior', image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp" },
  { name: 'Gucci', image: 'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp' },
  { name: 'Puma', image: 'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp' },
  { name: 'Amazon', image: 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp' },
  { name: 'Calvin Klein', image: 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp' },
  { name: 'Dolce & Gabbana', image: 'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp' },
];

// Duplicate the list to ensure seamless, continuous scrolling
const BRAND_ITEMS = [...TOP_BRANDS, ...TOP_BRANDS];

const TOTAL_SCROLL_WIDTH = TOP_BRANDS.length * 180; 

/**
 * A horizontal scrolling brand banner that pauses on hover.
 */
export default function BrandSlider({handleBrandsChange}) {
  const controls = useAnimation();

  const startScrolling = () => {
    controls.start({
      // Move left by the width of one full set of brands
      x: -TOTAL_SCROLL_WIDTH,
      transition: {
        x: {
          // Duration must be long enough to clearly see the brands
          duration: 35, // 35 seconds for a full loop
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    });
  };

  React.useEffect(() => {
    startScrolling();
  }, []);

  const handleMouseEnter = () => {
    controls.stop();
  };

  const handleMouseLeave = () => {
    startScrolling();
  };

  return (
    <div className="relative w-full overflow-hidden py-4 bg-background border-y border-pink-200">
      <div 
        className="w-full" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex flex-row space-x-8"
          animate={controls}
        >
          {BRAND_ITEMS.map((brand, index) => (
            <div 
            onClick={()=>{handleBrandsChange(brand.name)}}
              key={index} // Safe key because the content repeats but the index is unique within the list
              className="flex-shrink-0 w-[150px] h-[150px] p-4 flex flex-col items-center justify-center cursor-pointer group  hover:scale-105 transition-all duration-300 rounded-lg"
            >
              <img 
                src={brand.image} 
                alt={`${brand.name} logo`} 
                className="w-16 h-16 object-cover mb-2 rounded-full border border-gray-300" 
              />
              <span className="text-sm font-medium text-gray-800 capitalize">
                {brand.name}
              </span>
              <ChevronRight className="h-4 w-4 text-transparent group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );}