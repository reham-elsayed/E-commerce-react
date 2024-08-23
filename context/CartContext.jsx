import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider(props){
    let owner =  localStorage.getItem("owner") || "null"
    const [noOfCartItem, setNoOfCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
const [cartId, setCartId] = useState(null)
const [cartOwner, setCartOwner] = useState(owner)
useEffect(()=>{localStorage.setItem("owner", cartOwner)
    },[cartOwner])

let token;
    token = localStorage.getItem("token");
async function addProductToCart(productId){
    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {productId},
        {headers:
            {token}
        }
       
     ).then((response)=>{
        console.log(response);
        toast.success(response.data.message)
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setCartId(response.data.data._id)
        setCartOwner(response.data.data.cartOwner)
        return response;
     }).catch((error)=>{
        console.log(error)
        toast.error(error.data.message)
        return error
     })
}

async function getCartProduct(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        {headers:
            {token}
        }  
     ).then((response)=>{
        console.log(response);
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setCartId(response.data.data._id)
        setCartOwner(response.data.data.cartOwner)
        console.log(response.data.data.cartOwner)
        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}

async function deleteCartProduct(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        
        {headers:
            {token}
        }
     ).then((response)=>{
        console.log(response);
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setCartId(response.data.data._id)
        setCartOwner(response.data.data.cartOwner)
        toast.success("Item deleted Successfully")
        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}

async function clearCartProduct(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {headers:
            {token}
        }
     ).then((response)=>{
        console.log(response);
        toast.success(response.data.message)
        setNoOfCartItem(0)
        setTotalPrice(0)
       // setCartId(response.data.data._id)
        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}

async function updateCartProduct(productId, count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {count},
        {headers:
            {token}
        }
     ).then((response)=>{
        console.log(response);
        toast.success(response.data.data.totalCartPrice)
        setNoOfCartItem(response.data.numOfCartItems)
        setTotalPrice(response.data.data.totalCartPrice)
        setCartId(response.data.data._id)
        setCartOwner(response.data.data.cartOwner)
        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}
async function onLinePayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        shippingAddress,
        {headers:
            {token}
        }
     ).then((response)=>{
        console.log(response);
        clearCartProduct()
        setNoOfCartItem(0)
        setTotalPrice(0)
       // setCartOwner(response.data.data.cartOwner)
        window.location.href= response.data.session.url
        // toast.success(response.data.data.totalCartPrice)
        // setNoOfCartItem(response.data.numOfCartItems)
        // setTotalPrice(response.data.data.totalCartPrice)

        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}

async function cashPayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        {headers:
            {token}
        }
     ).then((response)=>{
        console.log(response);
         toast.success(response.data.data.status)
        setNoOfCartItem(0)
        setTotalPrice(0)
        setCartOwner(response.data.cartOwner)
        console.log(response.data.data.cartOwner)
        window.location.href="https://localhost:5173/allorders"
        // setNoOfCartItem(response.data.numOfCartItems)
        // setTotalPrice(response.data.data.totalCartPrice)

        return response;
     }).catch((error)=>{
        console.log(error)
        return error
     })
}

 

async function allCarts(){
 
    console.log(cartOwner)
return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`).then((response)=>{
   
    console.log(response)
    return response
  }).catch((err=>console.log(err)))
}
    return <CartContext.Provider value={{allCarts,cashPayment, onLinePayment, noOfCartItem, totalPrice, addProductToCart, getCartProduct, deleteCartProduct, updateCartProduct, clearCartProduct}}>

{props.children}
    </CartContext.Provider>
}