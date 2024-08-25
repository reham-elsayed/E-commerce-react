import React, { useRef ,useMemo, useCallback} from 'react';
import freshCart from './../../assets/freshcart-logo.svg'
import styles from "./Navbar.module.css";
import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext';
import { CartContext } from '../../../context/CartContext';
import { ThemeContext } from '../../../context/ThemeContext';
import { WishListContext } from '../../../context/WishListContext';

export default function Navbar() {
  let {theme,  toggleTheme} = useContext(ThemeContext);


const toggleFunction=()=>{
 toggleTheme(theme)
 

}

useEffect(()=>{
  if(theme == 'dark'){
    document.documentElement.classList.add("dark")
  }else{
    document.documentElement.classList.remove("dark")
  }
},[theme])
console.log(theme)
let {noOfCartItem, getCartProduct} = useContext(CartContext)
let {noOfWishListItems, setNoOfWishListItems} = useContext(WishListContext)
  let {token, setToken} = useContext(TokenContext)
  console.log(token)
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    
    setIsMenuVisible(!isMenuVisible);
    console.log(isMenuVisible)
  };
  function logOut(){
    localStorage.removeItem("token");
    setToken(null);
  }
  async function getCartOnLoad(){
    if (localStorage.getItem("token")){
      return await getCartProduct();
    }
  }
 useEffect(()=>{
  getCartOnLoad()
 }, [])
  return (
   
<nav className={`bg-white fixed navbar w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600  dark:bg-gray-900`}>
  <div className="container mx-auto p-2 flex flex-nowrap justify-between md:block">
    <div className=" md:flex justify-between ">
    <NavLink to="home" className=" flex-col md:flex items-center space-x-3 rtl:space-x-reverse dark:bg-gray-900 dark:border-gray-700 dark:text-white">
      <img src={freshCart} className="h-8 dark:text-white dark:bg-lime-400 dark:shadow-md dark:shadow-lime-800" alt="Flowbite Logo" />
  </NavLink>
      <div className=" md:flex md:flex-row flex-col justify-between gap-32">
        {token?
      <ul className={`md:flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${isMenuVisible?'flex':'hidden'}`}>
      <li>
        <NavLink to="" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
        to="cart"
        className="block py-2 px-3 text-gray-900 rounded hover:before:w-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Cart
<span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 opacity-85 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{noOfCartItem}</div>
</NavLink>
          


      </li>
      <li>
        <NavLink to="product"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Products</NavLink>
      </li>
      <li>
      <NavLink
        to="cart"
        className="block py-2 px-3 text-gray-900 rounded hover:before:w-full hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          wishList
<span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 opacity-85 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{noOfWishListItems}</div>
</NavLink>
      </li>
      <li>
        <NavLink to="category"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Category</NavLink>
      </li>
      <li>
        <NavLink to="brands"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Brands</NavLink>
      </li>
     
     
    </ul>: null}
        <ul
        className={`md:flex flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${isMenuVisible?'flex':'hidden'}`}>
  
<label className="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer"/>
  <div onClick={toggleFunction} 
  className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{theme} mode</span>
</label>


 {token? <li>
        <a href="/login"
        onClick={logOut}
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Logout</a>
      </li>:<>
  <li>
        <NavLink to="login" 
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Login</NavLink>
      </li>
      <li>
        <NavLink to="register"
        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
          Register</NavLink>
      </li></>}
     
</ul>
      </div>
      </div>
      <button data-collapse-toggle="navbar-sticky" 
      type="button" 
      onClick={toggleMenu}
      aria-expanded={!isMenuVisible}
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" >
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
   
    

  </div>
</nav>


  )
}
