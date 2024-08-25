import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export let WishListContext = createContext()

export default function WishListContextProvider(props){
const [wishList, setWishList] =useState([]);
const [noOfWishListItems, setNoOfWishListItems] =useState(0)
    let token;
    token = localStorage.getItem("token");

    async function getProductToWishlist(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
      
            {headers:
                {token}
            } 
         ).then((response)=>{
            console.log(response.data);
           // toast.success(response.data.message)
          let x =response.data.data.map(item=>item.id)
          setNoOfWishListItems(response.data.data.length)
          console.log(noOfWishListItems)
          setWishList(x)
          console.log(wishList, "from get")
            return response.data;
         })
         .catch((error)=>{
            console.log(error)
          //  toast.error(error.data.message)
            return error
         })
      }
      useEffect(()=>{
      getProductToWishlist()
      },[])

      async function addProductToWishlist(id){
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            {"productId": id},
            {headers:
                {token}
            } 
         ).then((response)=>{
            console.log(response);
            setWishList(response.data.data)
            setNoOfWishListItems(response.data.data.length)
            toast.success(response.data.message)
            return response;
         }).catch((error)=>{
            console.log(error)
           toast.error(error.data.message)
            return error
         })
    }
    async function deleteProductToWishlist(id){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            
            {headers:
                {token}
            } 
         ).then((response)=>{
            console.log(response);
            toast.success(response.data.message)
           setWishList(response.data.data)
          setNoOfWishListItems(response.data.data.length)
  console.log(response.data.data)
            return response;
         }).catch((error)=>{
            console.log(error)
          //  toast.error(error.data.message)
            return error
         })
      }
    return <WishListContext.Provider value={{noOfWishListItems, wishList, getProductToWishlist, addProductToWishlist,deleteProductToWishlist}}>

       {props.children} 
    </WishListContext.Provider>
}

