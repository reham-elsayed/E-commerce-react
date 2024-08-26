import React, { useState, useEffect } from 'react'
import  axios  from 'axios'
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from "./ProductDetail.module.css"
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
//import Sliderr from '../Slider/Sliderr'
import {Helmet} from "react-helmet";

export default function ProductDetail() {
  const [title, setTitle] = useState([{ id: -1, data: "" }]);

  const [product, setProduct] = useState({})
  const [allproduct, setAllProduct] = useState([])
  const [isLoading, setIsLoading] =useState(true)
  let { id, category } = useParams()
console.log(id)

let { addProductToCart }= useContext(CartContext)
 async function addToCart(productId){
  let response = await addProductToCart(productId)
  console.log(response)
 }


 async function getData(){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
      console.log(data)
      setProduct(data?.data.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  
  }

  async function getRelatedDetail(){
    return  await axios.get(`https://ecommerce.routemisr.com/api/v1/products`).then((data)=>{
     console.log(data?.data.data,"related")
     let product = data?.data.data.filter((item)=>item.category.name === category)

      setAllProduct(product)
      console.log(product)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  
  }

  async function handleTitleSplit(id){
    setTitle([{id:"-1", data:""}])
   
    console.log(title)
   }
   async function handleTitle(id,data){
    setTitle([{id,data}]);
    console.log("handle ",title)
   }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };
  useEffect(()=>{
    getData();
    getRelatedDetail();
  }, [])
  useEffect(()=>{
    getData();
    getRelatedDetail();
  }, [id])
console.log(product.images)
  return (
   <>
   {isLoading?<Loader/>: null}
   <div className="container mx-auto dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
    
    <div className="flex-col md:flex md:flex-row ">
      <div className='w-100 md:w-1/4 my-1'>
      <Slider {...settings}>
        {product.images?.map((item)=>
          <div>
          <img key={product.id} src={item} alt={product.title}/>
         </div>
      )}
    </Slider>
    {/* <Sliderr product={product}/> */}
</div>
      {/* <img src={product.imageCover}/></div> */}
      <div className={`w-100 md:w-3/4 l:w-3/4  ${styles.border} ms-2 p-3`}>
      
      <h1 className="text-black dark:text-white font-bolder text-2xl my-5"> {product.title}</h1>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{product.title}</title>
            </Helmet>
    <h5 className="text-gray-700 dark:text-white my-5">{product.description}</h5>
    <p className="my-5">{ product.category?.name}</p>
    <div className="flex justify-between items-center">
      <p className="w-1/2">
        {product.price} EGP
      </p>
      <div className="w-1/2"><i className="fa fa-star text-yellow-300"></i>{product.ratingsQuantity}</div>
    </div>
    <button onClick={()=>{addToCart(product.id)}} type="button" className="mt-10 inline-flex justify-center w-full items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Add to  cart
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
        </button>
    </div>
    </div>


    <div className='my-10 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
    {isLoading?<Loader/>:<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
      
{allproduct.map((product)=>(
  <div key={product.id} className=" bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <Link to={`/productdetail/${product.id}/${product.category.name}`}>
        <img className="rounded-t-lg w-full" src={product.imageCover} alt="" />
  
    <div className="p-5">
       
            <h5 className="mb-2 text-2xl tracking-tight text-green-700 dark:text-white">{product.category.name}</h5>
            <p 
            onMouseEnter={()=>{handleTitle(product.id, product.title)}}
            onMouseLeave={()=>{handleTitleSplit(product.id)}}
            onBlur={()=>{handleTitleSplit(product.id)}}
            className="mb-3 font-normal text-green-700 dark:text-gray-400  data-title">{(title && title[0].id== product._id)?title[0].data:product.title.split(' ').slice(0,2).join(" ") }</p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.price} EGP</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><i className="fa fa-star text-yellow-300"></i>{product.ratingsQuantity}</p>

        
    </div>
    </Link>
    <button type="button" onClick={()=>{addToCart(product.id)}} className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Add to  cart
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
</div>

))}
  </div>
}
    </div>
   </div>
   </>
  )
}
