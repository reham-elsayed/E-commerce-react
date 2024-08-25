import React, { useContext, useEffect} from 'react'
import styles from "./AddToWhishList.module.css";
import { useState} from 'react'
import { WishListContext } from '../../../context/WishListContext';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
export default function AddToWhishList() {
 let {wishList, getProductToWishlist, addProductToWishlist, deleteProductToWishlist} = useContext(WishListContext)
const [list, setList]= useState([])

let { addProductToCart }= useContext(CartContext)
 async function addToCart(productId){
  let response = await addProductToCart(productId)
  //console.log(response)
 }


  async function getWishList(){
   let response = await getProductToWishlist()
   setList(response.data)
   setX(response.data)
 }
 useEffect(()=>{
   getWishList()

 },[wishList])
 const [x, setX]= useState([])
//  useEffect(()=>{
//   let data = list.filter((item)=>item.id == wishList.map(item=>item))
//   setX(data)
//  },[wishList])
 console.log(x)
console.log(list)
 async function addWishList(id){
   let response = await addProductToWishlist(id)
 
 }
 async function deleteWishList(id){
  await deleteProductToWishlist(id)
  //  let newdata =await list.filter(item=>item.id == response.data)
  //  setList(newdata)
  

 }
//  async function handledisplayUpdate(){
//   let data = list.filter((item)=>item.id == wishList.map(item=>item))
//   setList(data)
//  }
 console.log(list)
// async function toggleHeart(id){



  return (
    <>
    <div className='py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  dark:bg-gray-800 dark:border-gray-700'>
  {x.length>0?x.map((product)=>
<div key={product.id} className={`cardhoverrr relative bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cardhoverrer}`}>
<button onClick={()=>{deleteProductToWishlist(product.id)}} type="button" className={`absolute right-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`}>
            <i className="fa fa-trash"></i>
           
        </button>
 <Link to={`/productdetail/${product.id}/${product.category.name}`}>
     <img className="rounded-t-lg w-full" src={product.imageCover} alt={product.title} />

 <div className="p-1">
    
         <h5 className="mb-2 text-2xl tracking-tight text-green-700 dark:text-white">{product.category.name}</h5>
         <p 
         
         className="mb-3 font-normal text-gray-700 dark:text-gray-400  data-title">{product.title.split(' ').slice(0,2).join(" ") }</p>
<div className="flex justify-between ">
     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.price} EGP</p>
     <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><i className="fa fa-star text-yellow-300"></i>{product.ratingsQuantity}</p>
     </div>
     
 </div>
 </Link>
 <div>
   {/* <AddToWhishList product={product} data={data.data.data}/></div> */}
   <div className={`flex justify-center items-center  ${styles.buton}`}>
    <div>
   <button onClick={()=>{addToCart(product.id)}} type="button" className={`${styles.handle} left-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
            Add to  cart
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
        
       
        </div>
        </div>
</div>
   </div> 

  ): <div className='col-span-4 h-full flex justify-center items-center text-center text-4xl' ><h1>WishList is empty</h1>  </div>}
  </div>
  </>)

}
