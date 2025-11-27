import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CrossIcon } from 'lucide-react';
import { useContext } from "react";
import { CartContext } from '../../../context/CartContext';
import { ProductStatsSwitcher } from './ProductStatsSwitcher';
import basket from "../../assets/basket.webp"

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
      key={product._id}
      className=" group bg-card text-card-foreground  rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative p-0 gap-0 border-none w-full max-w-[280px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[280px] h-[380px] flex flex-col"
      onMouseMove={handleMouseMove}
    >

      {/* Glow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full h-full bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(244,114,182,0.35),transparent_60%)]" />
      </div>

      {/* Motion Slider (Sold / Quantity Left) */}
      <ProductStatsSwitcher sold={product.sold} quantity={product.quantity} />

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-cover group-hover:rotate-y-180 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Add to Cart */}
        <span className="absolute inset-1 flex items-start justify-end">
          <Button
            onClick={() => addProductToCart(product._id)}
            className="p-0 h-10 w-10 rounded-full bg-white backdrop-blur-sm text-white font-bold uppercase tracking-widest
                        text-xs sm:text-sm md:text-base flex justify-center items-center hover:scale-110 "
            variant="ghost"
            size="icon"
          >
            <img src={basket} alt="Add to Cart" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"/>
          </Button>
        </span>
      </div>

      {/* Text Section */}
      <CardHeader className="p-4 pb-2 space-y-2">
        <CardTitle className="text-sm font-semibold line-clamp-1 text-card-foreground">
          {product.title}
        </CardTitle>

        <CardDescription className="text-xs text-card-foreground line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="p-4 pt-2 flex items-center justify-between">
        <span className="font-bold text-sm">${product.price}</span>

        <Link
          to={`/productdetail/${product._id}/${product.category._id}`}
          className="text-xs font-medium px-3 py-1.5 rounded-full border border-black hover:bg-black hover:text-white transition"
        >
          Details
        </Link>
      </CardFooter>
    </Card>
    );
};
 export default ProductCard;