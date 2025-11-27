
const VortexSaleSectionWrapper = ({ children }) => {
    return (<div className="flex justify-center items-center  relative h-[50vh] w-full  overflow-hidden">
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
      <div className="flex justify-end items-center w-full h-full">
          <div className="relative w-[40vh] h-[32vw] p-5  z-50 flex justify-center items-center">

           <p className="
        text-3xl 
        font-extrabold 
        text-black 
        bg-white/10 backdrop-blur-md border border-white/20
        p-4 
       text-end
        rounded-lg shadow-lg
        tracking-tight 
        md:text-5xl 
        lg:text-5xl
        uppercase
    ">20% Off on your first order</p>

            {/* Hidden content for accessibility */}
            <div className="sr-only">
                <p>
                    Explore categories: {categories.map(c => c.name).join(", ")} for our latest premium
                    selections.
                </p>
            </div>
        </div>
      </div>
    );
}

export const VortexFallback = () => (
    // Set the fallback div to fill the parent wrapper (h-full w-full)
    // Add a minimum height to reserve the visual space (relative to the wrapper's 90vh)
    <div className='w-full h-[500px]  absolute inset-0 bg-gray-100 dark:bg-gray-800 flex justify-center items-center'>
        {/* Optional: Add a subtle loading spinner or placeholder text */}
    </div>
);
