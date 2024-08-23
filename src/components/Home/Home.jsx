import React, { useContext, useEffect } from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';

import {Helmet} from "react-helmet";

 export default function Home() {
 
  return (
    <div className='mt-20 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
  <div className="container mx-auto p-10 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
 
    <MainSlider />
 
 

 <CategorySlider />

 </div>


      <FeatureProducts/>
    </div>
  )
}
