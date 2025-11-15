import React, { useContext, useEffect } from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Helmet } from "react-helmet";
import Loader from '../Loader/Loader';
import HeroSection from '../HeroSection/HeroSection';
import SliderDividerSmall from '../SliderDividerSmall/SliderDividerSmall';
import ImageVortexVanta from '../VortexSaleSection/VortexComponent';
import VortexSaleSectionWrapper, { GlassCategoryCard } from '../VortexSaleSection/VortexSaleSectionWrapper';
import { lazy } from 'react';
import { Suspense } from 'react';
const LazyVortex = lazy(() => import("../VortexSaleSection/VortexComponent"));
export default function Home() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      {/* 
      <div className='min-h-[calc(100vh-28rem)] '>
        <HeroSection />
        <SliderDividerSmall />
        <VortexSaleSectionWrapper>
          < GlassCategoryCard />
          <Suspense fallback={<div className='w-full h-full relative bg-blend-soft-light'></div>}>
            <LazyVortex />
          </Suspense>

        </VortexSaleSectionWrapper>
        <FeatureProducts />
      </div> */}
    </>
  )
}
