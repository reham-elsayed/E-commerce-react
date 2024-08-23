import React from 'react'
import styles from "./Products.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
export default function Products() {
  return (
    <div className="dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
      
      <FeatureProducts />
    </div>
  )
}
