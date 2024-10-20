import React from 'react'
import { useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { WishListContext } from '../../../context/WishListContext';
import {Helmet} from "react-helmet";
import ImageResizer from '../ImageResizer/ImageResizer';

export default function FeatureProducts() {
  const [isClicked, setIsClicked] = useState(false)
const [filtered, setFiltered] = useState([])
const [title, setTitle] = useState([{ id: -1, data: "" }]);
const [displayed, setDisplayed]= useState([])
let { addProductToCart }= useContext(CartContext)
const [isChecked, setIsChecked] = useState(false);
let {wishList, getProductToWishlist, addProductToWishlist, deleteProductToWishlist} = useContext(WishListContext)

 async function addToCart(productId){
  let response = await addProductToCart(productId)
  //console.log(response)
 }

function getFeaturedProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
let {data, isError, isLoading, error}= useQuery({
  queryKey:["featuredProducts"],
  queryFn:getFeaturedProducts,
})



const handleOnChange = (event) => {
  setIsChecked(event.target.checked);
};
async function handleSearch(e){
  let allData = data?.data.data
  console.log(allData)
  let newData = e.target.value
  let dataSearch = await allData.filter((product)=> product.title.toLowerCase().includes(newData.toLowerCase()))
  console.log(dataSearch)
 
  if (dataSearch.length > 0){
    setDisplayed(dataSearch)
  }
 else{
    setDisplayed(allData)
 }
}

// handle product descreption

 async function handleTitleSplit(id){
  setTitle([{id:"-1", data:""}])
 
  console.log(title)
 }
 async function handleTitle(id,data){
  setTitle([{id,data}]);
  console.log("handle ",title)
 }
 
 //    console.log(product.id)
 //   console.log(data)
 
 
 
   async function getWishList(){
    let response = await getProductToWishlist()
  
  }
  useEffect(()=>{
    getWishList()
  
  },[])
 
  async function addWishList(id){
    let response = await addProductToWishlist(id)
  
  }
  async function deleteWishList(id){
    let response = await deleteProductToWishlist(id)
  
  }
 
 useEffect(()=>{
  if( wishList.some(item=>item== displayed.id)){
    setIsClicked(true)
  }
 },[wishList])
 


   async function handleWishlist(id){  
    
   if (wishList.includes(id)){
    deleteProductToWishlist(id)
   }
   else{
    addProductToWishlist(id)
   }
    }


  return (
   
   <div className='container mx-auto px-4 '>
     {isLoading?<Loader/>:
     <div className='my-5'>
            <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">search</label>
            <input
            name="search"
            type="text"
            id="search"
            
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       
        </div>
}
    {isLoading?<Loader/>:<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
     
{displayed.length >0?displayed.map((product)=>
 <div key={product.id} className={`cardhoverrr bg-red-100 p-1 border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cardhoverrer}`}>
 <Link to={`/productdetail/${product.id}/${product.category.name}`}>
 <div className={`min-h-[100px]  bg-indigo-100 bg-gradient-to-green rounded-lg `}>
<ImageResizer image={product.imageCover} producttitle={product.title}/>
     {/* <img className="rounded-t-lg w-full" src={product.imageCover} alt={product.title} /> */}
</div>
 <div className="p-1 bg-white bg-opacity-60 mt-1 dark:bg-grey-800 ">
    
         <h5 className="mb-2 bg-transparent text-2xl tracking-tight text-green-700 dark:text-white">{product.category.name}</h5>
         <p 
         onMouseEnter={()=>{handleTitle(product.id, product.title)}}
         onMouseLeave={()=>{handleTitleSplit(product.id)}}
         onBlur={()=>{handleTitleSplit(product.id)}}
         className="mb-3 font-normal text-gray-700 dark:text-gray-400  data-title">{(title && title[0].id== product._id)?title[0].data:product.title.split(' ').slice(0,2).join(" ") }</p>
<div className="flex justify-between">
     <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{product.price} EGP</p>
     <p className="mb-1 font-normal text-gray-700 dark:text-gray-400"><i className="fa fa-star text-yellow-300"></i>{product.ratingsQuantity}</p>
     </div>
     
 </div>
 </Link>
 <div>
   {/* <AddToWhishList product={product} data={data.data.data}/></div> */}
    <i onClick={()=>{handleWishlist(id)}} className={`fa fa-heart text-3xl ${wishList.some(item=>item== product.id)?'text-red-500':'text-gray-500'}`}></i></div>
    <div className={`flex justify-center items-center  ${styles.buton}`}>
   <button onClick={()=>{addToCart(product.id)}} type="button" className={`${styles.handle}  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
            Add to  cart
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button></div>
</div>
)
:data?.data.data.map((product)=>(
  <div key={product.id} className={` bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cardhoverrer}`}>
    <Link to={`/productdetail/${product.id}/${product.category.name}`} aria-label={`go to ${product.category.name}`}>
    <div className={`min-h-[100px]  bg-indigo-100 bg-gradient-to-green rounded-lg `}>
    <ImageResizer image={product.imageCover} producttitle={product.title}/>
        {/* <img className="rounded-t-lg w-full" src={product.imageCover} alt={product.title} /> */}
  </div>
    <div className="p-1">
       
            <p className="mb-2 text-2xl tracking-tight text-green-700 dark:text-white">{product.category.name}</p>
            <p 
            onMouseEnter={()=>{handleTitle(product.id, product.title)}}
            onMouseLeave={()=>{handleTitleSplit(product.id)}}
            onBlur={()=>{handleTitleSplit(product.id)}}
            className="mb-3 font-normal text-gray-700 dark:text-gray-400  data-title">{(title && title[0].id== product._id)?title[0].data:product.title.split(' ').slice(0,2).join(" ") }</p>
<div className="flex justify-between">
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{product.price} EGP</p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400"><i className="fa fa-star text-yellow-300 me-2"></i>{product.ratingsQuantity}</p>
        </div>
        
    </div>
    </Link>
   
      {/* <AddToWhishList product={product} data={data.data.data}/></div> */}
       <i onClick={()=>{ handleWishlist(product.id)}} className={`fa fa-heart ${wishList.some(item=>item== product.id)?'text-red-500':'text-gray-500'}`}></i>
    <div className={`flex justify-center items-center  ${styles.buton}`}>
   <button onClick={()=>{addToCart(product.id)}} type="button" className={`${styles.handle}  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
            Add to  cart
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button></div>
</div>

))}
  </div>
}
    </div>
  
)
}
