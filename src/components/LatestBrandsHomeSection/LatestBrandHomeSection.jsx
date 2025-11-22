'use client'
import { useBrands } from '@/hooks/useBrands'
import { motion, useScroll, useTransform } from 'framer-motion'
import {  useRef } from 'react'
import { NavLink } from 'react-router-dom'
const imgs=["src/assets/slider-amazon.jpg","src/assets/slider-furniture.jpg","src/assets/slider-labtop.jpg","src/assets/slider-assus.jpg"]
const LatestBrandHomeSection = () => {
 
  const { data: brands, isLoading, isError } = useBrands()

  if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>
  if (isError) return <div className="h-screen flex items-center justify-center">Error loading brands</div>

  return (
 <div className=' flex justify-center items-center py-7 '>
  <div
   
    className='w-screen'
  >
    <div className='group flex flex-wrap md:flex-nowrap '>
      {brands?.slice(0, 4).map((brand,i) => (
      <div
        key={brand.name}
        className='
          relative w-1/2 md:w-1/4  overflow-hidden
          transition-all duration-500 ease-out md:h-96
        h-72  rounded-sm m-2
          md:hover:w-[120%] md: group-hover:w-[80%]
        '
      >
        <img
          src={imgs[i]}
          alt={brand.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-125 bg-gray-300  "
        />

        <div className='absolute right-0 left-0 bottom-3 flex justify-center items-end text-5xl font-bold text-pink-300 pointer-events-none'>
          <p className="text-center truncate font-extrabold uppercase tracking-widest 
                   text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                   hover:scale-105 transition-transform duration-300">
            {brand.name}
          </p>
        </div>

     <CTAButton brandName={brand.name}/>
      </div>
      ))}
    </div>

  </div>
</div>

  )
}

export default LatestBrandHomeSection


function CTAButton({brandName}){
   const targetRef = useRef(null)

  // Ensure ref exists before framer reads it

  const { scrollYProgress } = useScroll(
  
       {
          target: targetRef?targetRef:null,
          offset: ["start end", "end start"],
        }
      
  )

  const y = useTransform(scrollYProgress, [0, 1], [0, 180])


  return(
       <div  ref={targetRef} className='absolute inset-0 left-2 flex justify-start items-center pointer-events-none'>
            <motion.div
              style={{ y }}
              className="
                self-start 
                px-8 py-2 
                min-w-[120px] 
                backdrop-blur-sm
                bg-background/35 
                border border-border/60
                text-foreground
                font-semibold
                shadow-lg
                hover:bg-background/55
                hover:border-ring/80
                hover:shadow-xl
                active:scale-95
                transition-all duration-200
                
                overflow-hidden
              "
            >
                  <NavLink 
           className="relative pointer-events-auto"
           onClick={()=>console.log("click")}
           to={`/Brands/${brandName}`} >
           <>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-gray-500/5 rounded-[0.625rem] " ></div>


   <span className="px-4 py-2   text-white font-extrabold uppercase tracking-widest 
                   text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
                   hover:scale-105 transition-transform duration-300">
     Shop Now 
  </span>   
  </>
         </NavLink>  
    </motion.div>
          
          
        </div>
  )
}