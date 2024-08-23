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
 }
 useEffect(()=>{
   getWishList()

 },[])
console.log(list)
 async function addWishList(id){
   let response = await addProductToWishlist(id)
 
 }
 async function deleteWishList(id){
   let response = await deleteProductToWishlist(id)
 
 }

async function toggleHeart(id){

  setIsClicked(prevState => !prevState);
    console.log(isClicked, id)
 if(!isClicked){
 await addWishList(id)
 }else{
  deleteWishList(id)
 }
}

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2  dark:bg-gray-800 dark:border-gray-700'>
  {list.map((product)=>
<div key={product.id} className={`cardhoverrr bg-white p-2 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${styles.cardhoverrer}`}>
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
   <button onClick={()=>{addToCart(product.id)}} type="button" className={`${styles.handle}  inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}>
            Add to  cart
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button></div>
</div>
   </div> 

  )}
  </div>
  </>)

}
