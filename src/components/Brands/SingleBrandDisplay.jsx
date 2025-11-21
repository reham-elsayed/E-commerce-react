import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useProductsByBrand } from "@/hooks/useBrands";
import { CrossIcon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from '../../../context/CartContext';

const TABS = ["All", "Low Price", "High Rating"]; 

const SingleBrandDisplay = () => {
  const { brandname } = useParams();
  const { data: products = [], isLoading, isError } = useProductsByBrand(brandname);
  const [activeTab, setActiveTab] = useState("All");
    let { addProductToCart } = useContext(CartContext)

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "Low Price":
        return [...products].sort((a, b) => a.price - b.price);
      case "High Rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }, [products, activeTab]);

  if (isLoading) return <p className="text-center py-10">Loading products...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Brand Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 capitalize">
        {brandname} Products
      </h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 border-b border-gray-200">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm md:text-base transition-all duration-200
              ${activeTab === tab
                ? "border-b-2 border-black font-semibold"
                : "text-gray-500 hover:text-black"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
             onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  }}
          >
           
 
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <div className="w-full h-full bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(251,191,36,0.35),transparent_60%)]" />
</div>
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden ">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:rotate-y-180 group-hover:scale-105  transition-transform duration-300"
              />

              {/* Overlay CTA */}
              <span className="absolute inset-1 flex items-start justify-end">
                <span
                onClick={addProductToCart}
                 className="px-4 py-2 h-10 w-10 rounded-full bg-black backdrop-blur-sm text-white font-bold uppercase tracking-widest
                                 text-xs sm:text-sm md:text-base flex justify-center items-center ">
                <CrossIcon width={50} height={50}/>
                </span>
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold line-clamp-1">{product.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-sm">${product.price}</span>
                <Link
                  to={`/productdetail/${product.id}/${product.category}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-black hover:bg-black hover:text-white transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleBrandDisplay;
