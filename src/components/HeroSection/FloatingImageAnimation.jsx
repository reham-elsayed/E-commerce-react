"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// placeholder data for images
const floatingImages = {
    clothes: [
        { id: "c1", position: "top-[20%] left-[15%]", color: "bg-pink-400" },
        { id: "c2", position: "bottom-[25%] right-[30%]", color: "bg-pink-500" },
        { id: "c3", position: "top-[55%] left-[40%]", color: "bg-rose-400" },
    ],
    design: [
        { id: "d1", position: "top-[30%] right-[25%]", color: "bg-green-400" },
        { id: "d2", position: "bottom-[20%] left-[25%]", color: "bg-emerald-500" },
        { id: "d3", position: "top-[10%] left-[50%]", color: "bg-lime-400" },
    ],
    tech: [
        { id: "t1", position: "top-[25%] left-[30%]", color: "bg-blue-400" },
        { id: "t2", position: "bottom-[15%] right-[15%]", color: "bg-indigo-500" },
        { id: "t3", position: "top-[50%] right-[40%]", color: "bg-sky-400" },
    ],
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
        <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
                {active && (
                    <>
                        {data.map((img) => (
                            <motion.div
                                key={img.id}
                                variants={variants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className={`absolute ${img.position} w-32 h-32 rounded-xl shadow-xl ${img.color} opacity-90`}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
