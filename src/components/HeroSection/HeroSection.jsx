import React, { useState } from "react";
import FloatingImages from "./FloatingImageAnimation";

export default function HeroSection() {
    const [active, setActive] = useState(null);

    return (
        <section className="relative overflow-hidden flex items-center justify-center bg-[#ffd6ec] text-[#100f14] px-0 py-24 min-h-[70vh] md:min-h-screen">
            <h1 className=" text-xl md:text-3xl lg:text-6xl uppercase font-stroy font-bold !leading-tight text-center mx-auto max-w-[90rem] w-full h-full relative">
                <p>
                    We curate the world's best products <br /> Find amazing
                    <span
                        onMouseEnter={() => setActive("clothes")}
                        onMouseLeave={() => setActive(null)}
                        className="px-3 text-nowrap bg-[#100F14] rounded-md text-[#FFD6EC] "
                    >
                        <span
                            className="mt-0.5 md:mt-1 inline-block"
                        >
                            CLOTHES,
                        </span>

                    </span>{" "}
                    and{" "}
                    <span
                        onMouseEnter={() => setActive("design")}
                        onMouseLeave={() => setActive(null)}
                        className="text-green-400 cursor-pointer hover:underline"
                    >
                        fresh GROCERIES
                    </span>{" "}
                    and advanced
                    <span
                        onMouseEnter={() => setActive("tech")}
                        onMouseLeave={() => setActive(null)}
                        className="text-blue-400 cursor-pointer hover:underline"
                    >
                        TECH GEER
                    </span>
                    gear—all here.
                    <FloatingImages active={active} />
                </p>
            </h1>

            {/* Floating placeholders */}

        </section >
    );
}
