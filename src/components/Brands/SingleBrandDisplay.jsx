import { useState, useMemo } from "react";
import {  useParams } from "react-router-dom";
import { useProductsByBrand } from "@/hooks/useBrands";

import ProductCard from "../ProductCardGeneral/ProductCardGeneral";

const TABS = ["All", "Low Price", "High Rating"]; 

const SingleBrandDisplay = () => {
  const { brandname } = useParams();
  const { data: products = [], isLoading, isError } = useProductsByBrand(brandname);
  const [activeTab, setActiveTab] = useState("All");

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </section>
  );
};

export default SingleBrandDisplay;