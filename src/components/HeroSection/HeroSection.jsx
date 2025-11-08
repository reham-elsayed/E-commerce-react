import React, { useState } from "react";
import FloatingImages from "./FloatingImageAnimation";
import SliderDividerSmall from "../SliderDividerSmall/SliderDividerSmall";

export default function HeroSection() {
    const [active, setActive] = useState(null);

    return (
        <section className="relative  py-global overflow-hidden flex items-center justify-center bg-[#ffe6e9] text-[#100f14] min-h-[70vh]   fnder-container  md:-mt-8">
            {/* The main text is wrapped to allow for easier responsiveness */}
            <div className=" px-global w-[95vw] mx-auto">
                <p className="fnder-headline relative">
                    LOOKING FOR YOUR NEXT FIT?<br />
                    {/* Highlight CLOTHES */}
                    <span
                        onMouseEnter={() => setActive("clothes")}
                        onMouseLeave={() => setActive(null)}
                        className="cursor-pointer"
                    >
                        {/* Styles applied here: padding, background, text color */}
                        <span
                            className="inline-block leading-none  px-3 my-2 text-pink-soft bg-[#100F14] text-highlight hover:bg-green-bright hover:text-yellow-bright rounded-md"
                        >
                            CLOTHES
                        </span>,
                    </span>{" "}
                    AND fresh{" "}
                    {/* Highlight GROCERIES */}
                    <span
                        onMouseEnter={() => setActive("design")}
                        onMouseLeave={() => setActive(null)}
                        className="cursor-pointer"
                    >
                        <span
                            className="inline-block px-3 my-2 leading-none text-pink-soft bg-[#100F14] text- highlight hover:bg-blue-vivid hover:text-cyan-light rounded-md"
                        >
                            GROCERIES
                        </span>
                    </span>{" "}
                    AND ADVANCED
                    {/* Highlight TECH GEER */}
                    <span
                        onMouseEnter={() => setActive("tech")}
                        onMouseLeave={() => setActive(null)}
                        className="cursor-pointer"
                    >
                        <span
                            className="inline-block px-3 my-2 leading-none text-pink-soft bg-[#100F14] text- highlight hover:bg-red-intense hover:text-pink-soft rounded-md"
                        >
                            TECH GEER
                        </span>
                    </span>
                    <FloatingImages active={active} />
                </p>
            </div>


            {/* Floating placeholders */}

        </section >
    );
}