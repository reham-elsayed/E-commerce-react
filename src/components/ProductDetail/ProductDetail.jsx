import React, { useState, useEffect } from 'react'
import  axios  from 'axios'
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import styles from "./ProductDetail.module.css"
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import Sliderr from '../Slider/Sliderr'
import {Helmet} from "react-helmet";
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import { Star } from 'lucide-react';
import { Truck } from 'lucide-react';
import ProductCard from '../ProductCardGeneral/ProductCardGeneral';
import { SectionTitle } from '../TitleComponent/TitleComponent';
import { NavLink } from 'react-router-dom';
import { ArrowBigRight } from 'lucide-react';
import { Store } from 'lucide-react';
import { StarIcon } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { BadgeCheck } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { TrendingUp } from 'lucide-react';
import { Undo2 } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';

export default function ProductDetail() {
const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    
    const [product, setProduct] = useState({});
    const [allproduct, setAllProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { id, category } = useParams(); // 'category' may be undefined initially

    let { addProductToCart } = useContext(CartContext);
    async function addToCart(productId) {
        let response = await addProductToCart(productId);
        console.log(response);
    }

    // Fetch Main Product Data
    async function getProductDetail(productId) {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
            const fetchedProduct = response.data.data;
            console.log(fetchedProduct);
            setProduct(fetchedProduct);
            return fetchedProduct; 
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    //Fetch Related Products
    async function getRelatedDetail(productCategory, currentProductId) {
        if (!productCategory) return; 

        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{params:{ 'category[in]': productCategory }});
            const related = response.data.data
                .filter(item => item.id !== currentProductId)
                .slice(0, 4); 

            setAllProduct(related);
        } catch (err) {
            console.error(err);
        }
    }

    // --- useEffect for Initial Load and ID Change ---
    useEffect(() => {
        // 1. Fetch the main product
        getProductDetail(id).then(fetchedProduct => {
            if (fetchedProduct && fetchedProduct.category) {
                // 2. Use category from the fetched product to get related items
                getRelatedDetail(fetchedProduct.category._id, fetchedProduct.id);
            }
        });
        
        // Cleanup function for when the component unmounts or ID changes
        return () => {
            setProduct({});
            setAllProduct([]);
        };
    }, [id]); // Depend only on 'id'

    // If the component is loading or product data hasn't arrived, show the loader.
    if (isLoading || !product.id) {
        return <Loader />;
    }
  return (
   <>
   <div className=" dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
   <div className="container mx-auto max-w-9xl px-4 py-8">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${product?.title} | HYPE STATION`}</title>
            </Helmet>

        <div className="flex flex-col md:flex-row gap-8 items-center">

    {/* 1. Image Slider */}
    <div className="w-full md:w-1/4 lg:w-2/6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-sm shadow-sm">
            <Slider {...settings}>
                {(product.images || []).map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`${product.title} image ${index + 1}`}
                            className="w-full h-auto object-cover aspect-square"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    </div>

    {/* 2. Product Information */}
    <div className="w-full md:w-2/4 lg:w-2/6 p-4">

        <h1 className="text-black dark:text-white font-extrabold text-3xl mb-2">
            {product.title}
        </h1>

        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6">
            Brand: {product.brand?.name}
        </p>

        <h5 className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {product.description}
        </h5>

        <p className="mb-6 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Category: {product.category?.name}
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">

            {/* Price + Rating */}
            <div className="flex justify-between items-center mb-2">
                <div className="w-1/2">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {product.price} EGP
                    </p>
                </div>

                <div className="w-1/2 flex items-center justify-end">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-xl font-semibold text-black dark:text-white">
                        {product.ratingsAverage}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        ({product.ratingsQuantity} reviews)
                    </span>
                </div>
            </div>

            {/* Brand Page Link */}
            <div>
                <NavLink
                    to={`/Brands/${product.brand?.slug}`}
                    className="
                        inline-flex items-center gap-1.5 
                        px-4 py-2 
                        rounded-sm
                        bg-gray-100/55 
                        text-gray-800
                        backdrop-blur-sm
                        font-medium 
                        transition-all duration-300
                        hover:bg-indigo-100
                        hover:text-gray-900
                        group
                    "
                >
                    See other products of {product.brand?.name}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowBigRight className="w-4 h-4" />
                    </span>
                </NavLink>
            </div>

            {/* Stock Status */}
            <p className={`text-base font-semibold ${product.quantity > 10 ? 'text-green-600' : 'text-orange-500'} mb-4`}>
                {product.quantity > 0
                    ? `${product.quantity} items left in stock`
                    : 'Out of Stock'}
            </p>

            {/* Add to Cart */}
            <Button
                onClick={() => addToCart(product.id)}
                disabled={product.quantity === 0}
                className="inline-flex justify-center w-full items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50"
            >
                <ShoppingCart className="w-5 h-5 mr-3" />
                {product.quantity > 0 ? 'Add to Cart' : 'Notify When Available'}
            </Button>
        </div>
    </div>

    {/* Seller Info */}
       <div className='w-full md:w-1/4 lg:w-2/6 border border-gray-200 dark:border-gray-700 rounded-sm p-4 shadow-sm'> <div className="mt-4 dark:bg-gray-800 text-basic text-gray-700 dark:text-gray-300 space-y-2"> <div className='flex flex-col items-center justify-center space-y-4 border-b border-gray-300 pb-4 mb-4'>
         <p className="flex items-center"> 
          <Store className="w-4 h-4 mr-2 -ms-2 text-blue-500" /> Sold by: <span className="ml-1 font-medium text-gray-900 dark:text-gray-100">Hype Station</span> </p> <div className='flex justify-between items-center '> <p className="flex items-center border-r border-gray-300 pr-4"> <StarIcon className="w-4 h-4 mr-2 text-yellow-500" /> 
         Rating: <span className="ml-1 font-medium">4.1 / 5</span> </p> 
         <p className="flex items-center pl-2"> <ThumbsUp className="w-4 h-4 mr-2 text-green-500" />
          Positive Feedback: <span className="ml-1 font-medium">75%</span>
           </p> 
           </div>
           </div> <div className='flex flex-wrap space-y-4 gap-x-1'> 
            <p className="flex items-center inline-flex items-center gap-1.5 p-2 rounded-sm bg-gray-100/55 text-gray-800 backdrop-blur-sm"> <BadgeCheck className="w-4 h-4 text-blue-500" /> Item as described: 
            <span className="ml-1 font-medium">80%</span> 
            </p> 
            <p className="flex items-center inline-flex items-center gap-1.5 p-2 rounded-sm bg-gray-100/55 text-gray-800 backdrop-blur-sm"> <Calendar className="w-4 h-4 text-indigo-500" />
             Partner since: <span className="ml-1 font-medium">3+ years</span>
              </p>
               <p className="flex items-center inline-flex items-center gap-1.5 p-2 rounded-sm bg-gray-100/55 text-gray-800 backdrop-blur-sm"> <RotateCcw className="w-4 h-4 text-purple-500" /> 
               Low return rate seller 
               </p>
                <p className=" flex items-center gap-1.5 p-2 rounded-sm bg-gray-100/55 text-gray-800 backdrop-blur-sm"> <TrendingUp className="w-4 h-4 text-green-500" /> Great recent rating </p> </div>
                 <div className='flex flex-col space-y-4 border-t border-gray-300 pt-4 mt-4'> 
                  <p className="flex items-center"> <Truck className="w-4 h-4 mr-2 text-blue-600" /> 
                  Free delivery on Lockers & Pickup Points </p> 
                  <p className="flex items-center"> 
                    <Undo2 className="w-4 h-4 mr-2 text-orange-500" /> 
                    Easy & hassle-free returns </p> 
                    <p className="flex items-center"> 
        <ShieldCheck className="w-4 h-4 mr-2 text-green-600" /> Secure payments </p>
         </div> 
         </div> 
         </div>
   

</div>

       


    <div className='my-10 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
    {isLoading?<Loader/>:
   <>
      <SectionTitle title="Related Products" className="col-span-full"/>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
{allproduct.map((product)=>(
  <ProductCard key={product.id} product={product}/>

))}
  </div>
   </>
}
    </div>
   </div>
    </div>
   </>
  )
}
