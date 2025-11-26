import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export const ProductStatsSwitcher = ({ sold, quantity }) => {
  const [showSold, setShowSold] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSold((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-2 left-2 z-20">
      <AnimatePresence mode="wait">
        {showSold ? (
          <motion.div
            key="sold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-1 text-xs font-semibold bg-black/70 text-white rounded-full shadow"
          >
            Sold: {String(Math.round(sold)).slice(0, 3)}
          </motion.div>
        ) : (
          <motion.div
            key="stock"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="px-2 py-1 text-xs font-semibold bg-yellow-500/80 text-black rounded-full shadow"
          >
            Left: {quantity}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
