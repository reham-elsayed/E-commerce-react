"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useProducts } from "./useProducts";
import { useNavigate } from "react-router-dom";

export function useProductSearch(){
   const navigate = useNavigate();
  const[isSearching,setIsSearching]=useState(false)
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [products, setProducts] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const searchRef = useRef(null);
  const inputRef = useRef(null);


const {data:products}=useProducts()

  // Local filtering
  useEffect(() => {
    setFilteredProducts(products);
    const term = query.toLowerCase();
    const filtered = products?.filter((p) =>
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category?.name?.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered? filtered : products);
    setHighlightedIndex(0);
  }, [query, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearching(false)
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : prev
        );
        setIsSearching(true)
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
                setIsSearching(true)

        break;

      case "Enter":
        e.preventDefault();
        if (filteredProducts[highlightedIndex]) {
          handleProductSelect(filteredProducts[highlightedIndex]);
          
        }
        break;

      case "Escape":
        setIsOpen(false);
        setIsSearching(false)
        inputRef.current?.blur();
        break;
    }
  };

  // When user selects value
  const handleProductSelect = (product) => {
    console.log("Selected:", product);
    setQuery("");
    setIsSearching(false)
    setIsOpen(false);
    navigate(`/productdetail/${product.id}/${product.category}`)
  };

  const clearSearch = () => {
    setQuery("");
    setIsSearching(false)
    inputRef.current?.focus();
  };

  return {
    query,
    setQuery,
    isOpen,
    setIsOpen,
    filteredProducts,
    highlightedIndex,
    setHighlightedIndex,
    searchRef,
    inputRef,
    handleKeyDown,
    clearSearch,
    handleProductSelect,
    isSearching,
    setIsSearching
  };
}