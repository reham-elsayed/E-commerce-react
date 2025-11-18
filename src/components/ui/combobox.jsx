"use client";

import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./input";
import { Badge } from "./badge";
import { useProductSearch } from "@/hooks/useProductSearch";


export function SearchWithData({setIsSearching}) {
  const {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    filteredProducts,
    highlightedIndex,
    searchRef,
    inputRef,
    handleKeyDown,
    clearSearch,
    setHighlightedIndex,
    handleSelect,
   
  } = useProductSearch();
function handleFocus(){
if (filteredProducts.length > 0)
  {setIsOpen(true) 
  setIsSearching(true)}
}
  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />

        <Input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-12 border-gray-200 focus-visible:ring-purple-400"
        />

        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="max-h-96 overflow-y-auto">
              {filteredProducts.map((product, index) => {
                const isHighlighted = index === highlightedIndex;
                return (
                  <motion.div
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-4 py-3 cursor-pointer border-b last:border-b-0 transition-colors ${
                      isHighlighted ? "bg-purple-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <h4 className="font-medium truncate">{product.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    {product.category && (
                      <Badge className="mt-1 text-xs">
                        {product.category.name}
                      </Badge>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="p-2 bg-gray-50 border-t text-xs text-center text-muted-foreground">
              Use ↑↓ to navigate • Enter to select • Esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
