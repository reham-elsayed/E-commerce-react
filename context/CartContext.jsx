import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider(props){
    let owner =  localStorage.getItem("owner") || "null"
    let userId= localStorage.getItem("user") || "null"
    const [noOfCartItem, setNoOfCartItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
const [cartId, setCartId] = useState(null)
const [cartOwner, setCartOwner] = useState(owner)
useEffect(()=>{
    
    localStorage.setItem("owner", cartOwner)
    },[cartOwner])

let token;
    token = localStorage.getItem("token");

    function updateCartState(cart) {
  setNoOfCartItem(cart.totalQuantity);
  setTotalPrice(cart.total);
  setCartId(cart.id);
  setCartOwner(cart.userId);
}

async function addProductToCart(productId) {
  try {
    // 1) Load current cart for the user
    const { data } = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
    const cart = data.carts?.[0];

    // If no cart exists → create new one
    if (!cart) {
      const createRes = await axios.post(`https://dummyjson.com/carts/add`, {
        userId,
        products: [{ id: productId, quantity: 1 }]
      });

      updateCartState(createRes.data);
      toast.success("Product added to cart");
      return createRes;
    }

    // 2) Update existing cart:
    // Find the product and increment or add
    const existing = cart.products.find(p => p.id === productId);

    let updatedProducts = [...cart.products];

    if (existing) {
      updatedProducts = updatedProducts.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedProducts.push({ id: productId, quantity: 1 });
    }

    // 3) Use PUT to update the cart
    const updateRes = await axios.put(
      `https://dummyjson.com/carts/${cart.id}`,
      {
        merge: false,
        products: updatedProducts.map(p => ({
          id: p.id,
          quantity: p.quantity
        }))
      }
    );

    updateCartState(updateRes.data);
    toast.success("Product added to cart");

    return updateRes;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    return error;
  }
}



async function getCartProduct() {
  try {
    const response = await axios.get(`https://dummyjson.com/carts/user/${userId}`);

    const cart = response.data?.carts?.[0]; // first cart object

    if (cart) {
      setTotalPrice(cart.total);               // cart total price
      setCartId(cart.id);                      // cart ID
      setCartOwner(cart.userId);               // user ID that owns this cart
      setNoOfCartItem(cart.totalProducts);     // number of products in this cart
    }

    console.log(cart?.userId);

    return response;

  } catch (error) {
    console.log(error);
    return error;
  }
}
async function deleteCartProduct(productId) {
  try {
    // 1) Get existing cart
    const { data } = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
    const cart = data.carts?.[0];
    if (!cart) throw new Error("Cart not found");

    // 2) Remove the target product
    const updatedProducts = cart.products.filter(p => p.id !== productId);

    // 3) Simulate update using PUT
    const updateRes = await axios.put(
      `https://dummyjson.com/carts/${cart.id}`,
      {
        merge: false,      // overwrite old products
        products: updatedProducts.map(p => ({
          id: p.id,
          quantity: p.quantity
        }))
      }
    );

    updateCartState(updateRes.data);
    toast.success("Item deleted successfully");

    return updateRes;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
    return error;
  }
}


async function clearCartProduct(cartId){
    return await axios.delete(`https://dummyjson.com/carts/${cartId}`,
     ).then((response)=>{
        console.log(response);
        toast.success(response.data.message)
        setNoOfCartItem(0)
        setTotalPrice(0)
       // setCartId(response.data.data._id)
        return response;
     }).catch((error)=>{
        console.log(error)
        toast.error("something went wrong")
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
        toast.success(response.data.data.message)
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