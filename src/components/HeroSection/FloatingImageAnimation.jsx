"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// placeholder data for images
// const floatingImages = {
//     clothes: [
//         {
//             color: "bg-[#3b82f6]",
//             style: "position: absolute; inset: -20% auto auto 5%; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#3b82f6]",
//             style: "position: absolute; inset: -30% 5% auto auto; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#3b82f6]",
//             style: "absolute; inset: auto auto 0px 15%; opacity: 0; transform: translateY(20px) scale(0.8)",
//             animation: "",
//         },
//         {
//             color: "",
//             style: "position: absolute; inset: auto 15% 15% auto; opacity: 0; transform: translateY(20px) scale(0.8); ",
//         },
//     ],
//     design: [
//         {
//             color: "bg-[#3b82f6]", // blue-500
//             style: "position: absolute; inset: -24% auto auto 30%; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#22c55e]", // green-500
//             style: "position: absolute; inset: 20% -5% auto auto; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#eab308]", // yellow-500
//             style: "position: absolute; inset: auto 35% 20% auto; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#ef4444]", // red-500
//             style: "position: absolute; inset: auto auto -5% 15%; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//     ]
//     ,
//     tech: [
//         {
//             color: "bg-[#ef4444]",
//             style: "position: absolute; inset: -5% auto auto 15%; opacity: 0; transform: translateY(20px) scale(0.8);",
//             animation: "",
//         },
//         {
//             color: "bg-[#3b82f6]",
//             style: "position:absolute;top:-15%;right:20%;left:auto;bottom:auto;opacity:0;transform:translateY(20px) scale(0.8)",
//             animation: "",
//         },
//         {
//             color: "bg-[#22c55e]",
//             style: "position:absolute;top:auto;right:auto;left:-5%;bottom:10%;opacity:0;transform:translateY(20px) scale(0.8)",
//             animation: "",
//         },
//         {
//             color: "bg-[#f59e0b]",
//             style: "position:absolute;top:auto;right:40%;left:auto;bottom:5%;opacity:0;transform:translateY(20px) scale(0.8)",
//             animation: "",
//         },
//     ]

//     ,
// }

const floatingImages = {
    clothes: [
        {
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/5 left-[5%] ",
            animation: "",
        },
        {
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-1/6 right-[5%] ",
            animation: "",
        },
        {
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute bottom-0 left-[15%] ",
            animation: "",
        },
        {
            color: "bg-[#ef4444]",
            style: "absolute bottom-[15%] right-[15%]",
        },
    ],
    design: [
        {
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-2/10 left-[30%]",
            animation: "",
        },
        {
            color: "bg-[#22c55e]", // green-500
            style: "absolute top-[20%] -right-5% ",
            animation: "",
        },
        {
            color: "bg-[#eab308]", // yellow-500
            style: "absolute bottom-[20%] right-[35%] ",
            animation: "",
        },
        {
            color: "bg-[#ef4444]", // red-500
            style: "absolute -bottom-5% left-[15%]",
            animation: "",
        },
    ]
    ,
    tech: [
        {
            color: "bg-[#ef4444]", // red-500
            style: "absolute -top-5% left-[15%] ",
            animation: "",
        },
        {
            color: "bg-[#3b82f6]", // blue-500
            style: "absolute -top-[15%] right-[20%]",
            animation: "",
        },
        {
            color: "bg-[#22c55e]", // green-500
            style: "absolute -left-5% bottom-[10%] ",
            animation: "",
        },
        {
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
        <div className="absolute inset-0 pointer-events-none hidden md:block">

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
                                className={`absolute ${img.style} w-32 h-32 rounded-xl shadow-xl ${img.color} opacity-90`}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
