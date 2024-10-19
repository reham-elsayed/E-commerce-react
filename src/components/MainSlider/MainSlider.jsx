import React from 'react'
import styles from "./MainSlider.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import images from './../../assets/images.json'
import image1 from "./../../assets/grocery-banner-2.jpeg";
import image2 from "./../../assets/slider-image-2.webp";
import image3 from "./../../assets/slider-2small.jpeg";
import image4 from './../../assets/slider-image-3.webp';


export default function MainSlider() {


  var settings = {
   
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots:false,
    autoplaySpeed:2000,
    autoplay:true,
    

  };


  return (
    <div className="my-1 md:my-10 ">
      <div className="flex  mx-auto container">
        <div  className="w-3/4 h-[200] lg:h-[300px]">
    <Slider {...settings}>
    <div className={`lg:h-[300px] h-[200px] bg-indigo-100 bg-gradient-to-green rounded-lg `}>

       <img src={image3} alt="slider" className="h-[200px] lg:h-[300px] w-full"  /> </div>
       <div className={`lg:h-[300px] h-[200px]  bg-indigo-100 bg-gradient-to-green rounded-lg `}>

       <img src={image4} alt="slider" className="lg:h-[300px] h-[200px] w-full"  /> </div>
</Slider>
</div>
<div className="w-1/4 lg:h-[300px] h-[200px]  bg-indigo-100 bg-gradient-to-green rounded-lg ">

<img src={image1} className="lg:h-[150px] h-[100px] w-full" alt="main slider img"/>
<img src={image2} className="lg:h-[150px] h-[100px] w-full" alt="main slider img"/>

</div>
</div>
</div>
  )
}