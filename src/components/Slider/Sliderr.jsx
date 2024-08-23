import React, { useState, useEffect } from 'react'
import styles from "./Sliderr.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Slider({product}) {
  console.log(product)
const [prodImg, setProdImg]= useState([])
// useEffect(()=>{
//   setProdImg(product.images);
// },[])
console.log(product)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
 <>
   <Slider {...settings}>
        {product.images.map((item)=>
          <div>
          <img src={item}/>
         </div>
      )}
     </Slider>
 </>
  )
}
