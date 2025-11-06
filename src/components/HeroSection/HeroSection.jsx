import React, { useState } from "react";
import FloatingImages from "./FloatingImageAnimation";

export default function HeroSection() {
    const [active, setActive] = useState(null);

    return (
        <section className="relative flex flex-col items-center justify-center h-[100vh] bg-neutral-950 text-white">
            <h1 className="text-6xl font-bold text-center z-10">
                Build amazing{" "}
                <span
                    onMouseEnter={() => setActive("clothes")}
                    onMouseLeave={() => setActive(null)}
                    className="text-pink-400 cursor-pointer hover:underline"
                >
                    Clothes
                </span>{" "}
                and{" "}
                <span
                    onMouseEnter={() => setActive("design")}
                    onMouseLeave={() => setActive(null)}
                    className="text-green-400 cursor-pointer hover:underline"
                >
                    Design
                </span>{" "}
                with{" "}
                <span
                    onMouseEnter={() => setActive("tech")}
                    onMouseLeave={() => setActive(null)}
                    className="text-blue-400 cursor-pointer hover:underline"
                >
                    Tech
                </span>
            </h1>

            {/* Floating placeholders */}
            <FloatingImages active={active} />
        </section>
    );
}
