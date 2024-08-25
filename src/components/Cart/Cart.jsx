import React from 'react'
import {useState, useEffect, useContext} from 'react';
import styles from "./Cart.module.css"
import { Link } from 'react-router-dom'
import { CartContext } from '../../../context/CartContext'
import {Helmet} from "react-helmet";

export default function Cart() {
  let { getCartProduct, deleteCartProduct, updateCartProduct, clearCartProduct, totalPrice } = useContext(CartContext)
  const [cartItems, setCartItems ]= useState([])
  const [isClicked, setIsClicked]=useState(false)
async function getCart(){
  let response = await getCartProduct()
  setCartItems(response.data.data.products)
}
useEffect(()=>{
  getCart()

},[])
function toggleDropDowon(){
  setIsClicked(!isClicked)
}
async function deleteItem(productId){
  let response = await deleteCartProduct(productId)
  setCartItems(response.data.data.products)

 console.log(response)
}
async function updateItem(productId, count){
  let response = await updateCartProduct(productId, count)
  setCartItems(response.data.data.products)

 console.log(response)
}

async function clearCart(){
  let response = await clearCartProduct()
 
 if(response.data.message == "success"){
setCartItems([])
 }
 console.log(response)
}


  return (
   <>
   

<div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg my-32">
   <div className="text-right p-3">
   <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>
   {cartItems.length >0? <button onClick={()=>{clearCart()}} className="bg-red-800 text-white px-5 py-2 rounded-md">Clear Cart</button>: null}
   </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                   Unit Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {cartItems.map((item)=>
             <tr key={item.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
  <td className="p-4">
      <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
  </td>
  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {item.product.title}
  </td>
  <td className="px-6 py-4">
      <div className="flex items-center">
          <button
          onClick={()=>{updateItem(item.product.id, item.count-1 <= 0 ? deleteItem(item.product.id) : item.count - 1)}}
          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
              </svg>
          </button>
          <div>
             <span>{item.count}</span>
          </div>
          <button 
          onClick={()=>{updateItem(item.product.id, item.count+1)}}
          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
              </svg>
          </button>
      </div>
  </td>
  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {item.price} EGP
  </td>
  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {item.count * item.price} EGP
  </td>
  <td className="px-6 py-4">
      <button onClick={()=>{deleteItem(item.product.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
  </td>
            </tr>

          )}



        </tbody>
    </table>
              
{cartItems.length>0?  
 <div  className="flex  justify-between bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
  <div className="p-4 w-1/3">
    Total Price:
  </div>
  <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white  w-1/3">
      {totalPrice}
  </div>
  <div className="px-6 py-4 font-semibold text-gray-900 dark:text-white  w-1/3">
    
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
onClick={toggleDropDowon}
 className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button">Payment Method 
    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>


<div id="dropdown" className={`z-50 ${isClicked?'block':'hidden'}   divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
    <ul className="py-2 text-sm text-gray-900 bg-slate-200 dark:text-gray-200 rounded-md" aria-labelledby="dropdownDefaultButton">
      <li>
        <Link to="/checkout" 
        state={{type:"online Payment"}}
        className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Online Payment</Link>
      </li>
      <li>
      <Link to="/checkout" 
        state={{type:"Cash on delivery"}}
         className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cash On Delivery</Link>
      </li>
     
    </ul>
</div>

  </div>
  </div>: <div className='col-span-4 h-full flex flex-col justify-center items-center text-center py-10 ' >
    <h1 className='text-4xl py-10'>Cart is empty</h1> 
    <Link to="" className="bg-red-800 text-white px-5 py-2 rounded-md">Back to Home</Link>

     </div>}

</div>

   </>
  )
}
