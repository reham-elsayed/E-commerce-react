import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TokenContextProvider from '../context/TokenContext.jsx'
import CartContextProvider from '../context/CartContext.jsx'
import WishListContextProvider from '../context/WishListContext.jsx'
import  ThemeContextProvider from '../context/ThemeContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  
  
  <TokenContextProvider>
    <CartContextProvider>
  <WishListContextProvider>
  <ThemeContextProvider>
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThemeContextProvider>
  </WishListContextProvider>
  </CartContextProvider>
  </TokenContextProvider>
 
  
  ,

)
