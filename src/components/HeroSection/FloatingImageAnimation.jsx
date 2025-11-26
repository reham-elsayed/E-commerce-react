"use client";
import hero1 from "../../assets/hero1.webp";
import hero2 from "../../assets/hero2.webp";
import hero3 from "../../assets/hero3.webp";
import hero4 from "../../assets/hero4.webp";
import hero5 from "../../assets/hero5.webp";

import hero6 from "../../assets/hero6.webp";
import hero7 from "../../assets/hero7.webp";
import hero8 from "../../assets/hero8.webp";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";



const floatingImages = {
    clothes: [
        {
            src:hero1,
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/10 left-[5%] ",
            animation: "",
        },
        {
               src:hero2,
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/9 right-[5%] ",
            animation: "",
        },
        {
               src:hero3,
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute bottom-0 left-[15%] ",
            animation: "",
        },
        {
               src:hero4,
            color: "bg-[#ef4444]",
            style: "absolute bottom-[15%] right-[15%]",
        },
    ],
    design: [
        {
              src:hero5,
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/10 right-[10%]",
            animation: "",
        },
        {
              src:hero6,
            color: "bg-[#22c55e]", // green-500
            style: "absolute bottom-[7%] -right-5% ",
            animation: "",
        },
        {
              src:hero7,
            color: "bg-[#eab308]", // yellow-500
            style: "absolute bottom-[20%] right-[35%] ",
            animation: "",
        },
        {
              src:hero8,
            color: "bg-[#ef4444]", // red-500
            style: "absolute -bottom-5% left-[15%]",
            animation: "",
        },
    ]
    ,
    tech: [
        {
              src:hero6,
            color: "bg-[#ef4444]", // red-500
            style: "absolute -top-7% left-[15%] ",
            animation: "",
        },
        {
              src:hero1,
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-[10%] right-[20%]",
            animation: "",
        },
        {
              src:hero3,
            color: "bg-[#22c55e]", // green-500
            style: "absolute -left-5% bottom-[10%] ",
            animation: "",
        },
        {
              src:hero7,
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
