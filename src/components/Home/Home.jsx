import React, { useContext, useEffect } from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';

import { Helmet } from "react-helmet";
import Loader from '../Loader/Loader';
import HeroSection from '../HeroSection/HeroSection';

export default function Home() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <div className='min-h-[calc(100vh-28rem)]'>
        <HeroSection />
      </div>
    </>
  )
}
