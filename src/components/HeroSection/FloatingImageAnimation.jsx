import { motion, AnimatePresence } from "framer-motion";
import React from "react";



const floatingImages = {
    clothes: [
        {
              src:"https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/10 right-[10%]",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#22c55e]", // green-500
            style: "absolute bottom-[7%] -right-5% ",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#eab308]", // yellow-500
            style: "absolute bottom-[20%] right-[35%] ",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/896291/pexels-photo-896291.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#ef4444]", // red-500
            style: "absolute -bottom-5% left-[15%]",
            animation: "",
        },
    ]
    ,
    
 
    design:   [
        {
            src:"https://images.pexels.com/photos/14159263/pexels-photo-14159263.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/10 left-[5%] ",
            animation: "",
        },
        {
               src:"https://images.pexels.com/photos/5531747/pexels-photo-5531747.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/9 right-[5%] ",
            animation: "",
        },
        {
               src:"https://images.pexels.com/photos/3268625/pexels-photo-3268625.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute bottom-0 left-[15%] ",
            animation: "",
        },
        {
               src:"https://images.pexels.com/photos/8112333/pexels-photo-8112333.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#ef4444]",
            style: "absolute bottom-[15%] right-[15%]",
        },
    ],
    
    tech: [
        {
              src:"https://images.pexels.com/photos/34929079/pexels-photo-34929079.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#ef4444]", // red-500
            style: "absolute -top-7% left-[15%] ",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/34944571/pexels-photo-34944571.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-[10%] right-[20%]",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#22c55e]", // green-500
            style: "absolute -left-5% bottom-[10%] ",
            animation: "",
        },
        {
              src:"https://images.pexels.com/photos/850360/pexels-photo-850360.jpeg?auto=compress&cs=tinysrgb&w=600",
            color: "bg-[#f59e0b]", // amber-500
            style: "absolute bottom-[5%] right-[40%] ",
            animation: "",
        },
    ]
    ,
}
const variants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5 },
};

export default function FloatingImages({ active }) {
    // `active` is a string like "clothes" or "design" → decides which images to show
    const [floatingImagesActive, setFloatingImagesActive] = React.useState([]);
    const data = floatingImages[active] || [];
    return (
        <span className="absolute inset-0 pointer-events-none hidden md:block">

            <AnimatePresence>
                {active && (
                    <>
                        {data.map((img, i) => (
                            <motion.div
                                key={i}
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeOut", delay: i * .1 }}
                                className={`absolute ${img.style} w-50 h-60 rounded-xl shadow-xl ${img.color} opacity-90`}
                            >
<img src={img.src} alt="floating" loading="lazy" className="w-full h-full object-cover rounded-xl"/>

                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>

        </span>
    );
}
