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
    return (
        <div className="relative overflow-hidden  py-0  bg-[#ffe6e9] ">
            <div className="w-full h-5 ">
                <motion.div
                    // Initial position (start)
                    initial={{ x: 0 }}
                    // Target position (end of one cycle). 
                    // The animation loop continuously cycles between 0 and -50vw
                    animate={{ x: '-50%' }}
                    transition={sliderTransition}

                    className="w-[300vw] h-full uppercase flex items-center justify-start whitespace-nowrap  px-4"
                >
                    {<RepeatedHighlightedContent />}
                </motion.div>
            </div>
        </div>
    );
}

export default SliderDividerSmall;