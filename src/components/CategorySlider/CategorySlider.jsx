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
    responsive: [
    
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
  console.log(data?.data.data)
// setRevers(data?.data.data)
// console.log(revers)

  return (

    <>
     <h2 className="text-2xl text-green-700">Show Popular categories:</h2>
    <div className="relative md:my-10 ">
     <div className={`container mx-auto   `}>
      <Slider {...settings}>
        {data?.data.data.reverse().map((item)=>
        <div  key={item._id} className=" ">
                   <div className={`h-[100px]  bg-indigo-100 bg-gradient-to-green rounded-lg `}>
        <img  className="w-full h-[100px]" src={item.image} loading="lazy" alt={item.name}/>
        </div> 
        <p>{item.name}</p>
         </div>
      )}
       </Slider>
        </div> 
        </div>
      
    </>
  )
}
