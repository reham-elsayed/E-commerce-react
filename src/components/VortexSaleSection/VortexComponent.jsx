import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// --- ASSETS & DATA ---
// We mix the videos from your snippet with placeholder images to create the full grid.
const ITEMS = [
  {
    type: 'video',
    src:'https://www.pexels.com/download/video/3917703/',
        span: 'col-span-1 row-span-1',
  },
  {
    type: 'image',
    src: 
    'https://cdn.prod.website-files.com/6083048416ea717b1808c062/62d72eaf39e8759a115e1682_Spotify%20-%20Frequency%20-%20Still%2049.jpg',
    span: 'col-span-1 row-span-1',
  },
  {
    type: 'video',
    src: "https://www.pexels.com/download/video/4962796/",
    span: 'col-span-2 row-span-2', // Make this one bigger
  },
  
  {
    type: 'image',
    src:'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    span: 'col-span-1 row-span-1',
  },
  {
    type: 'video',
    src: "https://www.pexels.com/download/video/4962796/",
    span: 'col-span-2 row-span-1', // Wide item
  },
];

const VortexComponent= () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // --- MOUSE TRACKING ---
  // Using springs for smoother mouse follow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on cursor distance from center
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;
      
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleResize = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- TRANSFORMATIONS ---
  // Base rotation (17deg X, 7deg Y from your snippet) + Mouse Interaction
  const baseRotateX = 15;
  const baseRotateY = 5;

  const rotateX = useTransform(
    mouseYSpring,
    [-dimensions.height / 2, dimensions.height / 2],
    [baseRotateX + 30, baseRotateX - 30] // Reduced range to slow down rotation
  );
  
  const rotateY = useTransform(
    mouseXSpring,
    [-dimensions.width / 2, dimensions.width / 2],
    [baseRotateY - 25, baseRotateY + 25] // Reduced range and centered the effect
  );

  // Parallax movement for the whole plane
  const translateX = useTransform(mouseXSpring, [-dimensions.width / 2, dimensions.width / 2], [-20, 20]);
  const translateY = useTransform(mouseYSpring, [-dimensions.height / 2, dimensions.height / 2], [-20, 20]);

  return (
    <div className="absolute inset-0 top-5 w-full flex flex-col items-center justify-center  font-inter  overflow-hidden">
      
      
      {/* 500px Height Parent Container (Mask) */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full flex items-center justify-center overflow-hidden  border-y border-white/10 cursor-crosshair perspective-container"
        style={{ perspective: "1200px" }} // Critical for the 3D effect
      >
        
        {/* Animated 3D Plane */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-4 gap-6 w-full md:w-[100%] h-full p-10 origin-center"
        
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className={`relative rounded-sm    ${item.span}`}
               style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d", // Essential for nested 3D elements
          }}
          // Continuous floating animation
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
            >
              
              {/* Content Wrapper */}
              <div className="w-full h-full relative overflow-hidden group z-30">
                {/* Overlay Panel (from your snippet 'top-panel', 'left-side-panel' simulation) */}
                <div className="absolute inset-0 bg-pink-200/10 group-hover:bg-transparent transition-colors duration-300 z-10" />

                {item.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover rounded-sm  z-20"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={item.src}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt="Grid Item"
                    className="w-full h-full object-cover rounded-sm "
                  />
                )}

              </div>

                {/* Optional: 'Panel' sides for thickness effect if we wanted to go full 3D cube style */}
                <div className="absolute h-full w-full translate-x-1 bg-pink-900 inset-0 border-r border-b border-black pointer-events-none rounded-xl z-20" />
            </motion.div>
          ))}
        </motion.div>

        {/* Vignette Overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient-vignette z-30" />
        
      </div>
    </div>
  );
};
export default VortexComponent;