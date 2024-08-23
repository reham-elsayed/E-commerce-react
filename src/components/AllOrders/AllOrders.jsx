import React, { useContext, useEffect, useState } from 'react'
import styles from "./AllOrders.module.css"
import { CartContext } from '../../../context/CartContext'
import axios from 'axios';

export default function AllOrders() {
  let {allCarts} = useContext(CartContext)
const [allCartOrderss, setAllCartOrderss] = useState([])
const [owner, setOwner]= useState(null)

 

  async function getAllCarts(){
let data =await allCarts()
console.log(data)
setAllCartOrderss(data.data)
console.log(allCartOrderss)
  }
  useEffect(()=>{
   
    getAllCarts()
  },[])
  return (
  <>
  
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-16 py-3">
                    <span class="sr-only">Cart Items</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    Delivered
                </th>
                <th scope="col" class="px-6 py-3">
                    Paid
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Cart Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Delivery fees
                </th>
              
            </tr>
        </thead>
        <tbody>
          {allCartOrderss.map((item)=>
             <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
  <td class="p-4">
    {item.cartItems.map((product)=>
    <div>{product.product.title}</div>
    )}
      {/* <img src={item.product.imageCover} class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/> */}
  </td>
  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {item.isDelivered?<i className="fa fa-check text-green-700"></i>:<i className="fa fa-close text-red-700"></i>}
  </td>
  <td class="px-6 py-4">
      <div class="flex items-center">
        
          <div>
             <span>{item.isPaid?<i className="fa fa-check text-green-700"></i>:<i className="fa fa-close text-red-700"></i>}</span>
          </div>
         
      </div>
  </td>
  <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {item.totalOrderPrice} EGP
  </td>
 
  <td class="px-6 py-4">
    <div>{item.shippingPrice}</div>
  </td>
            </tr>

          )}
        </tbody>
    </table>
  </>
  )
}
