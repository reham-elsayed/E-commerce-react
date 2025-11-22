import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CrossIcon } from 'lucide-react';
import { useContext } from "react";
import { CartContext } from '../../../context/CartContext';
// Assuming CrossIcon is imported correctly
// Assuming addProductToCart is defined

// The component function wrapper for context
const ProductCard = ({ product }) => {
    let { addProductToCart } = useContext(CartContext)

    // The mouse move handler is essential for the glow effect
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--x', `${x}px`);
        e.currentTarget.style.setProperty('--y', `${y}px`);
    };

    // The structure uses the shadcn Card component as the main container
    return (
       <Card
    key={product.id}
    className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative p-0 gap-0 border-none w-full max-w-[280px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] h-[380px] flex flex-col"
    onMouseMove={handleMouseMove}
>
            {/* 1. Mouse-Tracking Glow Effect (Retained Custom Logic) */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* --x and --y custom CSS variables are used here */}
                <div className="w-full h-full bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(251,191,36,0.35),transparent_60%)]" />
            </div>

            {/* 2. Image Section (Combined CardHeader/CardContent) */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:rotate-y-180 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay CTA (Using Button for semantics) */}
                <span className="absolute inset-1 flex items-start justify-end">
                    <Button
                        onClick={addProductToCart}
                        // Shadcn Button's className is overridden with custom styling for the unique look
                        className="p-0 h-10 w-10 rounded-full bg-black backdrop-blur-sm text-white font-bold uppercase tracking-widest
                                    text-xs sm:text-sm md:text-base flex justify-center items-center hover:bg-black/90"
                        variant="ghost" // Use a ghost variant to easily override background
                        size="icon"
                    >
                        {/* Assuming CrossIcon is a placeholder for an Add/Cart icon */}
                        <CrossIcon width={50} height={50} /> 
                    </Button>
                </span>
            </div>

            {/* 3. Content Section (Using CardHeader/CardContent for structure) */}
            <CardHeader className="p-4 pb-2 space-y-2">
                {/* Title */}
                <CardTitle className="text-sm font-semibold line-clamp-1 p-0 m-0">
                    {product.title}
                </CardTitle>
                {/* Description */}
                <CardDescription className="text-xs text-gray-500 line-clamp-2 p-0 m-0">
                    {product.description}
                </CardDescription>
            </CardHeader>

            {/* 4. Footer Section (Using CardFooter) */}
            <CardFooter className="p-4 pt-2 flex items-center justify-between">
                <span className="font-bold text-sm">${product.price}</span>
                <Link
                    to={`/productdetail/${product.id}/${product.category}`}
                    // Shadcn Button is not used here to keep the original Link styling for navigation
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-black hover:bg-black hover:text-white transition"
                >
                    Details
                </Link>
            </CardFooter>
        </Card>
    );
};
 export default ProductCard;