import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, useMotionValue, animate, useTransform, useReducedMotion } from "framer-motion";

export default function FullScreenVortexImages() {
    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
    const resizeTimeoutRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    // Debounced resize handler for better performance
    useEffect(() => {
        const handleResize = () => {
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            resizeTimeoutRef.current = setTimeout(() => {
                setSize({ w: window.innerWidth, h: window.innerHeight });
            }, 150); // Debounce resize events
        };

        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("resize", handleResize);
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
        };
    }, []);

    const { w, h } = size;
    const cx = w / 2;  // Horizontal center
    const cy = h / 2;  // Vertical center

    // Memoize vortex centers to prevent unnecessary recalculations
    const vortexCenters = useMemo(() => [
        { x: cx, y: cy, id: 'vortex1', delay: 0 },      // First vortex - starts immediately
        { x: cx, y: cy, id: 'vortex2', delay: 0.33 }, // Second vortex - delayed by 1/3 cycle
        { x: cx, y: cy, id: 'vortex3', delay: 0.67 }, // Third vortex - delayed by 2/3 cycle
        { x: cx, y: cy, id: 'vortex4', delay: 0.80 },
        { x: cx, y: cy, id: 'vortex5', delay: 1 },
    ], [cx, cy]);

    // --- Controls the looping rotation ---
    const progress = useMotionValue(0);
    useEffect(() => {
        // Respect user's motion preferences
        const duration = prefersReducedMotion ? 0 : 8; // Pause animation if reduced motion is preferred
        if (duration > 0) {
            animate(progress, 1, {
                duration,
                ease: "linear",
                repeat: Infinity,
            });
        }
    }, [progress, prefersReducedMotion]);

    // Base image set
    const baseImages = [
        "src/assets/toa-heftiba--abWByT3yg4-unsplash.jpg",
        "src/assets/md-salman-tWOz2_EK5EQ-unsplash.jpg",
        "src/assets/shamblen-studios-F52I5BtDuhY-unsplash.jpg",
        "src/assets/keagan-henman-xPJYL0l5Ii8-unsplash.jpg",
    ];

    // Reduced images per vortex for better performance (40 per vortex = 120 total)
    const imagesPerVortex = 60;
    const images = useMemo(() => {
        const repeated = [];
        for (let i = 0; i < imagesPerVortex; i++) {
            repeated.push(baseImages[i % baseImages.length]);
        }
        return repeated;
    }, []);

    // Generate random starting positions at the edge for each image
    // Using seeded random for consistent positions per image
    // Memoized with useCallback for better performance
    const seededRandom = useCallback((seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }, []);

    // Helper function to calculate edge radius from a specific center point
    const getEdgeRadius = (angle, centerX, centerY) => {
        // For a rectangle, find which edge the ray hits first from the given center
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        // Calculate distances to each edge from the center point
        const distToRight = cosAngle > 0 ? (w - centerX) / cosAngle : Infinity;
        const distToLeft = cosAngle < 0 ? centerX / Math.abs(cosAngle) : Infinity;
        const distToBottom = sinAngle > 0 ? (h - centerY) / sinAngle : Infinity;
        const distToTop = sinAngle < 0 ? centerY / Math.abs(sinAngle) : Infinity;

        // Return the minimum (closest edge)
        return Math.min(distToRight, distToLeft, distToBottom, distToTop);
    };

    const imageConfigs = useMemo(() => {
        const allConfigs = [];

        // Create configs for each vortex
        vortexCenters.forEach((vortexCenter, vortexIndex) => {
            const vortexConfigs = images.map((src, i) => {
                // Seeded random angle around the circle for consistent positioning
                // Use vortex index to ensure different patterns per vortex
                const randomSeed = (i + vortexIndex * 1000) * 137.508;
                const startAngle = (i / images.length) * Math.PI * 2 + seededRandom(randomSeed) * 0.8;

                const edgeRadius = getEdgeRadius(startAngle, vortexCenter.x, vortexCenter.y);

                // Layer 0: outer edge (98-100% of edge radius - at the very edge)
                // Layer 1: middle edge (90-95% of edge radius - slightly inward)
                // Layer 2: inner edge (80-88% of edge radius - more inward)
                // Keep center empty (images disappear before reaching center)
                const layer = Math.floor(seededRandom(randomSeed + 10) * 3); // 0, 1, or 2
                const layerRadiusRanges = [
                    { min: 0.98, max: 1.0 }, // Outer layer: at the very edge
                    { min: 0.90, max: 0.95 }, // Middle layer: slightly inward
                    { min: 0.80, max: 0.88 }, // Inner layer: more inward
                ];
                const range = layerRadiusRanges[layer];
                const radiusVariation = seededRandom(randomSeed + 80);
                const startRadius = edgeRadius * (range.min + (range.max - range.min) * radiusVariation);

                // Optimized phase distribution for seamless coverage
                // Each vortex has a delay, and images within each vortex are staggered
                const totalPhase = 2.0; // Cover 2 full cycles for overlap
                const imagePhaseOffset = -0.8 + (i / images.length) * totalPhase; // Range: -0.8 to 1.2
                // Add vortex delay to stagger when each vortex starts
                const phaseOffset = imagePhaseOffset + vortexCenter.delay;

                return {
                    src,
                    startAngle,
                    startRadius,
                    layer,
                    spiralTurns: 0.4 + seededRandom(randomSeed + 1) * 0.4, // 0.4 to 0.8 turns
                    phaseOffset,
                    vortexCenter: { x: vortexCenter.x, y: vortexCenter.y },
                    vortexId: vortexCenter.id,
                };
            });

            allConfigs.push(...vortexConfigs);
        });

        return allConfigs;
    }, [images, w, h, vortexCenters, seededRandom]);

    // --- Spiral settings ---
    // Calculate a reference radius for spiral distances (use average of width and height)
    // Memoized to prevent recalculation on every render
    const { referenceRadius, minVisibleRadius } = useMemo(() => {
        const avgDimension = (w + h) / 2;
        return {
            referenceRadius: avgDimension * 0.5,
            minVisibleRadius: avgDimension * 0.30, // Large empty center - images disappear before this
        };
    }, [w, h]);

    return (
        <div
            className=" w-full con absolute inset-0 bg-[#ffe6e9] h-[722px] flex items-center justify-center"
            role="img"
            aria-label="Animated vortex of falling images "
        >

            <svg
                viewBox={`0 0 ${w} ${h}`}
                className="absolute w-full h-full"
                aria-hidden="true"
                style={{ willChange: 'transform' }} // Performance optimization
            >
                {imageConfigs.map((config, i) => {
                    const offset = config.phaseOffset;

                    // progress for this image (phase offset for staggered appearance)
                    // Handle seamless looping by wrapping progress values
                    const imgProgress = useTransform(progress, (p) => {
                        const totalProgress = offset + p;
                        // Wrap the progress to create seamless looping
                        // Use modulo with proper handling of negative values
                        let wrapped = totalProgress % 1;
                        if (wrapped < 0) {
                            wrapped += 1; // Convert negative modulo to positive
                        }
                        return wrapped;
                    });

                    // Circular spiral motion: angle increases as it spirals inward
                    const angleMotion = useTransform(
                        imgProgress,
                        (p) => config.startAngle + p * Math.PI * 2 * config.spiralTurns
                    );

                    // Calculate spiral distance based on layer
                    // Outer layers move more, inner layers move less (but all stop before center)
                    // Increased distances for wider spirals - based on reference radius
                    const layerSpiralDistances = [
                        referenceRadius * 0.80, // Outer layer: wider spiral
                        referenceRadius * 0.60, // Middle layer: wider spiral
                        referenceRadius * 0.55, // Inner layer: wider spiral
                    ];
                    const spiralDistance = layerSpiralDistances[config.layer];
                    const endRadius = Math.max(minVisibleRadius, config.startRadius - spiralDistance);

                    // Radius decreases (spiraling inward like falling)
                    // Ensure it never goes below minVisibleRadius to keep center empty
                    const radiusMotion = useTransform(
                        imgProgress,
                        (p) => {
                            const currentRadius = config.startRadius - spiralDistance * p;
                            return Math.max(minVisibleRadius, currentRadius);
                        }
                    );

                    // compute x,y from angleMotion and radiusMotion using the vortex center
                    const vortexCx = config.vortexCenter.x;
                    const vortexCy = config.vortexCenter.y;
                    const x = useTransform([angleMotion, radiusMotion], ([a, r]) => vortexCx + Math.cos(a) * r);
                    const y = useTransform([angleMotion, radiusMotion], ([a, r]) => vortexCy + Math.sin(a) * r);

                    // Image size configuration - adjust these values to change image size
                    const imageWidth = 400;  // Change this to adjust image width
                    const imageHeight = 200; // Change this to adjust image height
                    const centeredX = useTransform(x, (v) => v - imageWidth / 2);
                    const centeredY = useTransform(y, (v) => v - imageHeight / 2);

                    // rotation follows the spiral motion
                    const rotate = useTransform(angleMotion, (a) => (a * 180) / Math.PI);

                    // Visibility check: show images within a wider range for continuous coverage
                    // Allow images to be visible slightly before and after their main cycle
                    const visibility = useTransform(progress, (mainP) => {
                        const totalProgress = offset + mainP;
                        // Show images from -0.2 to 1.2 to ensure seamless transitions
                        // This creates overlap between cycles
                        return totalProgress >= -0.2 && totalProgress <= 1.2 ? 1 : 0;
                    });

                    // Fade out as it moves inward (falling effect)
                    // Also fade based on radius to ensure complete fade before center
                    // Smoother fade for better continuous coverage
                    const opacity = useTransform(
                        [visibility, imgProgress, radiusMotion, progress],
                        ([vis, p, r, mainP]) => {
                            if (vis === 0) return 0; // Not visible

                            const totalProgress = offset + mainP;

                            // Fade in at the start (smooth entrance)
                            let progressFade = 1;
                            if (totalProgress < 0.5) {
                                // Fade in from 0 to 0.1
                                progressFade = Math.max(0, totalProgress / 0.1);
                            } else if (totalProgress > 0.9) {
                                // Fade out from 0.9 to 1.0
                                progressFade = Math.max(0, (1.0 - totalProgress) / 0.1);
                            }

                            // Also fade as it approaches center (fade zone is 20% of reference radius)
                            const fadeZone = referenceRadius * 0.20;
                            const radiusFade = Math.max(0, Math.min(1, (r - minVisibleRadius) / fadeZone));

                            return Math.min(progressFade, radiusFade);
                        }
                    );

                    // Scale down as it falls (decrease in size)
                    const scale = useTransform(
                        imgProgress,
                        [0, 1],
                        [1, 0.15]
                    );

                    return (
                        <motion.image
                            key={`${config.vortexId}-${config.src}-${i}-${config.layer}`}
                            href={config.src}
                            width={imageWidth}
                            height={imageHeight}
                            preserveAspectRatio="xMidYMid slice" // Maintains aspect ratio
                            aria-hidden="true" // Decorative images don't need screen reader attention
                            style={{
                                x: centeredX,
                                y: centeredY,
                                rotate,
                                opacity,
                                scale,
                                willChange: prefersReducedMotion ? 'auto' : 'transform, opacity', // Performance hint
                            }}
                            className='object-fill shadow-lg'
                        // Note: SVG <image> elements don't support loading="lazy" like <img> tags
                        // Images are loaded by the browser automatically when the SVG is rendered
                        />

                    );
                })}
            </svg>

        </div>
    );
}


