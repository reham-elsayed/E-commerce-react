import FeatureProducts from '../FeatureProducts/FeatureProducts'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Helmet } from "react-helmet";
import HeroSection from '../HeroSection/HeroSection';
import SliderDividerSmall from '../SliderDividerSmall/SliderDividerSmall';
import LatestBrandHomeSection from '../LatestBrandsHomeSection/LatestBrandHomeSection';
export default function Home() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      
      <div className='min-h-[calc(100vh-28rem)] '>
        <HeroSection />
        <SliderDividerSmall />
        <LatestBrandHomeSection/>

        <FeatureProducts />
      </div>
     
    </>
  )
}
