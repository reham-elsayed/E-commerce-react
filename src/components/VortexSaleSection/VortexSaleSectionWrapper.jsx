import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const VortexSaleSectionWrapper = ({ children }) => {
    return (<div className="flex justify-center items-center  relative h-full w-full  overflow-hidden">
        {/* <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-hidden={false}
        >
                       <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                aria-hidden="true"
                style={{ pointerEvents: "none" }}
            /></div> */}
        {children}
    </div>

    )
}

export default VortexSaleSectionWrapper




import { motion } from "framer-motion";

const categories = [
    { name: "Smart", color: "from-blue-500/40 to-cyan-400/30" },
    { name: "Senior", color: "from-purple-500/40 to-pink-400/30" },
    { name: "Style", color: "from-emerald-400/40 to-teal-300/30" },
    { name: "Sport", color: "from-orange-400/40 to-amber-300/30" },
    { name: "Sound", color: "from-red-400/40 to-rose-300/30" },
    { name: "Space", color: "from-sky-400/40 to-indigo-300/30" },
];

export function GlassCategoryCard() {
    return (
        <div className="relative w-[32vh] h-[32vw] bg-transparent border-0  transition-all duration-500 z-50">
            {/* Category grid */}
            <div className="grid grid-cols-2 grid-rows-3 w-full h-full bg-transparent transition-transform">
                {categories.map((category, i) => (
                    <div
                        className={`${i % 2 === 0 ? "hover:-translate-x-3" : "hover:translate-x-3"} relative flex items-center justify-center text-center  cursor-pointer select-none transition-transform duration-300`}
                    >
                        <span className="text-forground text-3xl sm:text-4xl font-semibold tracking-tight drop-shadow-md">
                            {category.name}
                        </span>
                        {/* <div class="absolute inset-0  bg-white/10 backdrop-blur-2xl 
            border border-white/20 
            shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
            before:absolute before:inset-0 
            before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:to-transparent 
            before:opacity-60 before:pointer-events-none -z-0">
                        </div> */}
                        {/* Overlay for subtle shine */}
                        {/* <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /> */}
                    </div>
                ))}
            </div>

            {/* Optional glass glow edge (adds premium feel) */}
            {/* <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10 shadow-inner shadow-white/10" /> */}

            {/* Hidden content for accessibility */}
            <div className="sr-only">
                <p>
                    Explore categories: {categories.map(c => c.name).join(", ")} for our latest premium
                    selections.
                </p>
            </div>
        </div>
    );
}


