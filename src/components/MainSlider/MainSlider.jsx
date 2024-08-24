import React from 'react'
import styles from "./MainSlider.module.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import images from './../../assets/images.json'
import image1 from "./../../assets/slider-image-3.jpeg";
import image2 from "./../../assets/slider-image-1.jpeg";
import image3 from "./../../assets/slider-image-1.jpeg";
import image4 from "./../../assets/slider-image-2.jpeg";
const images = {
  "images": [
    {
      "id": 1,
      "name": "Image1",
      "path": "./../../assets/slider-image-1.jpeg"
    },
    {
      "id": 2,
      "name": "Image2",
      "path": "./../../assets/slider-image-2.jpeg"
    }
    
  ]
}

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
images.images.map((item)=>console.log(item.path))
// Dynamically generate slider items
const sliderItems = images.images.map((item, index) => (
  <img key={item.id} src="{`${item.path}`}" className="h-[300px]" alt="" />
));

  return (
    <div className="my-10 ">
      <div className="flex  mx-auto container">
        <div  className="w-3/4 ">
    <Slider {...settings}>
       {/* {sliderItems} */}
       <img src={image3} alt="" className="h-[300px]" /> 
       <img src={image4} alt="" className="h-[300px]" /> 
</Slider>
</div>
<div className="w-1/4">
<img src={image1} className="h-[150px] w-full" alt="main slider img"/>
<img src={image1} className="h-[150px] w-full" alt="main slider img"/>

</div>
</div>
</div>
  )
}
