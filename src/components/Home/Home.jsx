import React, { useContext, useEffect } from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';

import {Helmet} from "react-helmet";
import Loader from '../Loader/Loader';

 export default function Home() {
 
  return (
    <>
       <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>

            <div className='mt-20 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>

<div className="container mx-auto min-h-screen p-0 md:p-10 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
 
<>
  <MainSlider />
<CategorySlider />
</>
 
</div>
    <FeatureProducts/>
  </div>
    </>
  
  )
}
