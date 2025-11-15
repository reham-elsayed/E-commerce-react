import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const VortexSaleSectionWrapper = ({ children }) => {
    return (<div className="flex justify-center items-center  relative h-screen w-full  overflow-hidden">
        {children}
    </div>

    )
}

export default VortexSaleSectionWrapper

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
        <div className="relative w-[40vh] h-[32vw] bg-transparent border-0 z-50 flex justify-center items-center">

            <p className="text-3xl">Hot DEALs</p>

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


