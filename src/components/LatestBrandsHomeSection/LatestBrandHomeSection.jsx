import { useBrands } from '@/hooks/useBrands'
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const LatestBrandHomeSection = () => {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    })
    const y = useTransform(scrollYProgress, [0, 0.4], [0, 200])
    const { data: brands, isLoading, isError } = useBrands()

    if (isLoading) return <div className="h-[200vh] flex items-center justify-center">Loading...</div>
    if (isError) return <div className="h-[200vh] flex items-center justify-center">Error loading brands</div>

    return (
        <div className='h-[200vh] flex justify-center items-center'>
            <div
                ref={targetRef}
                className='group flex flex-nowrap w-screen gap-1'
            >
                {brands?.slice(0, 4).map(brand => (
                    <div
                        key={brand.name}
                        className='transition-all relative duration-500 ease-out h-60 hover:w-[110%] group-hover:w-[90%] w-full bg-gray-300'
                    >
                        <img
                            src={brand.image}
                            alt={brand.name}
                            width={320}
                            height={350}
                            className="object-cover w-full h-full"
                        />
                        <div className='absolute inset-0 flex justify-center items-center text-2xl text-pink-300'>
                            <motion.button
                                initial={{ y: 0 }}
                                style={{ y }}
                                className='self-start'
                            >
                                SHOP
                            </motion.button>
                            <p className="text-center text-sm font-medium truncate">{brand.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestBrandHomeSection