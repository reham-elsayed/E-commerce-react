import React, { useRef, useMemo, useCallback } from 'react';
import freshCart from './../../assets/freshcart-logo.svg'
import styles from "./Navbar.module.css";
import { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../../context/TokenContext';
import { CartContext } from '../../../context/CartContext';
import { ThemeContext, ThemeDispatchContext } from '../../../context/ThemeContext';
import { WishListContext } from '../../../context/WishListContext';
import { Navbar04 } from '../ui/shadcn-io/navbar-04';

export default function Navbar() {
  let { theme } = useContext(ThemeContext);
  let { toggleTheme } = useContext(ThemeDispatchContext);
  const navigate = useNavigate()


  console.log(theme)
  let { noOfCartItem, getCartProduct } = useContext(CartContext)
  let { noOfWishListItems } = useContext(WishListContext)
  let { token, setToken } = useContext(TokenContext)
  console.log(token)

  function logOut() {
    navigate('/home')
    localStorage.removeItem("token");
    setToken(null);
  }
  async function getCartOnLoad() {
    if (localStorage.getItem("token")) {
      return await getCartProduct();
    }
  }
  useEffect(() => {
    getCartOnLoad()
  }, [])
  function handleOnCartClick() {
    if (token) {
      navigate("cart")
    }
    else {
      navigate("login")
    }
  }
  return (
    <>


      <Navbar04
        cartHref='cart'
        cartCount={noOfCartItem}
        onSignInClick={logOut}
        signInText="Log Out"
        token={token}
        onCartClick={handleOnCartClick}
        wishlistCount={noOfWishListItems}
      />

    </>
  )
}
