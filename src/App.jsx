import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Home from './components/Home/Home'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Category from './components/Category/Category'
import NotFound from './components/Not-found/Not-found'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetail from './components/ProductDetail/ProductDetail'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import CheckOut from './components/CheckOut/CheckOut'
import AddToWhishList from './components/AddToWhishList/AddToWhishList'
import SingleBrandDisplay from './components/Brands/SingleBrandDisplay'
import BrandsLayout from './components/Brands/BrandsLayout'


const router= createBrowserRouter([
{
  path:"",
  element:<Layout/>,
  children:[
    {
      index:true,
      element:<Home/>

    },
    {path:"home",
      element:<ProtectedRoutes><Home /></ProtectedRoutes>
    },
    {
      path:"product",
      element:<ProtectedRoutes><Products/></ProtectedRoutes>
    },
    {path:"login", element:<ProtectedAuth><Login/></ProtectedAuth>},
    {path:"signup", element:<ProtectedAuth><Register/></ProtectedAuth>},
    {path:"Cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    { path: "Brands",
  element: <ProtectedRoutes><BrandsLayout /></ProtectedRoutes>,
  children: [
    { index: true, element: <Brands /> },
    { path: ":brandname", element: <SingleBrandDisplay /> }
  ]},
    {path:"category", element:<ProtectedRoutes><Category/></ProtectedRoutes>},
    {path:"forgotpassword", element:<ForgotPassword/>},
    {path:"resetpassword", element:<ResetPassword/>},
    {path:"changepassword", element:<ChangePassword />},
{path:"productdetail/:id/:category", element:<ProtectedRoutes><ProductDetail /></ProtectedRoutes>},
    {path:"checkout",element: <ProtectedRoutes><CheckOut/></ProtectedRoutes>},
{path:"allorders", element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
{path:"wishlist", element:<ProtectedRoutes><AddToWhishList/></ProtectedRoutes>},

{path:"*", element:<NotFound/>}
  ]
}
])
function App() {
const queryClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={queryClient}>
   <RouterProvider router={router}></RouterProvider>
  <ReactQueryDevtools initialIsOpen={false}/>
   <Toaster/>
   </QueryClientProvider>
    </>
  )
}

export default App
