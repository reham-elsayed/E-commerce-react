import Loader from '../Loader/Loader';
import {Helmet} from "react-helmet";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

import { useBrands } from '@/hooks/useBrands';
import { Link } from 'react-router-dom';
import { Card, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
export default function Brands() {
const{data: brands,isLoading}=useBrands()

  return (
    <div className='container mx-auto px-4 '>
    {isLoading?<Loader/>:
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2'>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
{brands.map((product)=>(
<CategoryCard key={product.name} categoryName={product.name} categoryId={product.id} categoryImage={product.image} productCount={product.productCount}/>

))}
  </div>
}
    </div>
  )
}

// Assuming you have a Link component from a router (like react-router-dom or Next.js)

export const CategoryCard = ({ categoryName, categoryImage, productCount ,categoryId}) => {
  
 const wiggleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 1, -1, 0], // Small, subtle wiggle motion
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        delay: 0.5, // Start wiggling after half a second
      }
    }
  };

  return (
    // Card Container: Fixed, compact size
    <Card
      key={categoryName}
      className="w-[280px] h-full group flex flex-col rounded-sm backdrop-blur-md  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative p-0 border-none"
    >
      {/* --- 1. Image Section (Fixed Aspect Ratio) --- */}
      <div className="relative aspect-[7/8] overflow-hidden">
        
        {/* Product Image */}
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120 group-hover:rotate-y-180 "
          src={categoryImage}
          alt={categoryName}
        />

        {/* --- 2. Floating CTA Button with Wiggle and Glass Blur --- */}
        <div className="absolute inset-0 flex items-end justify-items-start p-4">
          <motion.div
            variants={wiggleVariants}
            initial="initial"
            animate="animate"
          >
            <Button
              asChild // Render as a Link element for routing
              // CTA Styling: Persistent, glass effect
              className="px-5 py-2.5  font-bold text-sm text-black transition-all duration-300 
                         bg-white/30 backdrop-blur-md border border-white/30 
                         hover:bg-white/40 hover:scale-105"
              variant="default" 
              size="sm"
            >
              <Link to={`/Brands/${categoryId}`}>
                View Products
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* --- 3. Content Section (Bold Typography & Counter) --- */}
      <CardFooter className="flex  items-center justify-between py-4 px-4 bg-gray-50 dark:bg-gray-900">
        
        {/* Name: Big and Bold Dark Color */}
        <h5 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
          {categoryName}
        </h5>
        
        {/* Product Count: Animated Counter */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
          <AnimatedCount finalValue={productCount} /> {productCount===1?"Product":"products"}
        </div>
      </CardFooter>
    </Card>
  )
};


// Component to handle the smooth counting animation
const AnimatedCount = ({ finalValue }) => {
  const count = useMotionValue(0); // Starts at 0
  const rounded = useTransform(count, (latest) => Math.round(latest)); // Rounds the value

  useEffect(() => {
    // Animates the count from 0 to finalValue when the component mounts
    const controls = animate(count, finalValue, { 
      duration: 1.8, // 1.5 seconds for the count up
      ease: "easeOut"
    });

    return controls.stop; // Clean up the animation on unmount
  }, [finalValue, count]);

  return <motion.span>{rounded}</motion.span>;
};