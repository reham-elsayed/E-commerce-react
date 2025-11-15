import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { WishListContext } from '../../../context/WishListContext';
import { Link } from 'react-router-dom';
const ProductCard = ({ product, styles }) => {
    let { addProductToCart } = useContext(CartContext)
    // const [isChecked, setIsChecked] = useState(false);
    // const [isClicked, setIsClicked] = useState(false)
    const [title, setTitle] = useState([{ id: -1, data: "" }]);

    let { wishList, getProductToWishlist, addProductToWishlist, deleteProductToWishlist } = useContext(WishListContext)

    async function addToCart(productId) {
        let response = await addProductToCart(productId)
        //console.log(response)
    }
    async function handleTitleSplit(id) {
        setTitle([{ id: "-1", data: "" }])

        console.log(title)
    }
    async function handleTitle(id, data) {
        setTitle([{ id, data }]);
        console.log("handle ", title)
    }
    async function handleWishlist(id) {

        if (wishList.includes(id)) {
            deleteProductToWishlist(id)
        }
        else {
            addProductToWishlist(id)
        }
    }
    // useEffect(() => {
    //     if (wishList.some(item => item == displayed.id)) {
    //         setIsClicked(true)
    //     }
    // }, [wishList])

    return (
        <div
            key={product.id}
            className={`group relative bg-white/10 backdrop-blur-xl border border-white/20 
    rounded-3xl shadow-lg overflow-hidden transition-all duration-300 
    hover:shadow-2xl hover:-translate-y-1 ${styles.cardhoverrer}`}
        >
            <Link to={`/productdetail/${product.id}/${product.category.name}`}>

                {/* Image Section */}
                <div className="relative h-44 w-full overflow-hidden rounded-t-3xl">
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Fun floating badge */}
                    <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs rounded-full shadow-md">
                        {product.category.name}
                    </span>
                </div>

                {/* Body */}
                <div className="p-3 bg-white/60 dark:bg-gray-900/50 backdrop-blur-md rounded-b-3xl">

                    {/* Title hover effect */}
                    <h3
                        onMouseEnter={() => handleTitle(product.id, product.title)}
                        onMouseLeave={() => handleTitleSplit(product.id)}
                        onBlur={() => handleTitleSplit(product.id)}
                        className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors"
                    >
                        {(title && title[0]?.id == product._id)
                            ? title[0].data
                            : product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    {/* Price + Rating */}
                    <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                            {product.price} EGP
                        </p>
                        <p className="text-yellow-400 flex items-center gap-1">
                            <i className="fa fa-star"></i>
                            {product.ratingsQuantity}
                        </p>
                    </div>
                </div>
            </Link>

            {/* Wishlist Button */}
            <button
                onClick={() => handleWishlist(product.id)}
                className="absolute top-3 right-3 text-2xl hover:scale-125 transition-transform"
            >
                <i
                    className={`fa fa-heart ${wishList.some((item) => item == product.id)
                        ? "text-red-500"
                        : "text-white/80"
                        }`}
                ></i>
            </button>

            {/* Add to Cart */}
            <div className="flex justify-center items-center p-3">
                <button
                    onClick={() => addToCart(product.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 
      text-sm font-medium rounded-xl text-white bg-green-700 
      hover:bg-green-800 transition-all shadow-md hover:shadow-lg"
                >
                    Add to cart
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 14 10"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default ProductCard