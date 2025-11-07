// This version is the correct way to have a purely self-running animation.
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RepeatedHighlightedContent from '../Slider/repeatedHighlightedContent';

const SliderDividerSmall = () => {
    // Defines the animation loop parameters
    const sliderTransition = {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20, // Adjust speed here
        ease: "linear",
    };

    const textContent = `ASDFGHJKL ASDFGHJKL ASDFGHJKL <span className=" bg-red-intense "> ASDFGHJKL</span> ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL ASDFGHJKL`;

    return (
        <div className="relative overflow-hidden  py-0 -translate-6 bg-[#ffe6e9]">
            <div className="w-full h-5 ">
                <motion.div
                    // Initial position (start)
                    initial={{ x: 0 }}
                    // Target position (end of one cycle). 
                    // The animation loop continuously cycles between 0 and -50vw
                    animate={{ x: '-50vw' }}
                    transition={sliderTransition}

                    className="w-[150vw] h-full  flex items-center justify-start whitespace-nowrap text-3xl font-bold px-4"
                >
                    {<RepeatedHighlightedContent />}
                </motion.div>
            </div>
        </div>
    );
}

export default SliderDividerSmall;