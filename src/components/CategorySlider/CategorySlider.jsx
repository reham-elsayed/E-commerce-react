import React from 'react'
import { useState } from 'react'
import styles from "./CategorySlider.module.css"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategorySlider() {
function getCategory(){

  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}
  let { data } = useQuery({
    queryKey:["categorySlider"],
    queryFn:getCategory,
    staleTime:1000,
    
  })


    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
   
  };
  console.log(data?.data.data)
// setRevers(data?.data.data)
// console.log(revers)

  return (

    <>
     <h2 className="text-2xl text-green-700">Show Popular categories:</h2>
    <div className="relative my-10 ">

   {/* <Slider {...settings}>
        {data?.data.data.map((item)=>
        <div className="min-h-1/2">
        <img className="w-full h-[100px]" src={item.image}/>
       
         </div>
      )}
       </Slider>   */}

     <div className={`container mx-auto   `}>
      <Slider {...settings}>
        {data?.data.data.reverse().map((item)=>
        <div className=" ">
        <img className="w-full h-[100px]" src={item.image}/>
        <p>{item.name}</p>
         </div>
      )}
       </Slider>
        </div> 
        </div>
      
    </>
  )
}
