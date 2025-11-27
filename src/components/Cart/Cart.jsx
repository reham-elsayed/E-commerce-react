import {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'
import { CartContext } from '../../../context/CartContext'
import {Helmet} from "react-helmet";
import Loader from '../Loader/Loader';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function Cart() {
  let { getCartProduct, deleteCartProduct, updateCartProduct, clearCartProduct, totalPrice } = useContext(CartContext)
  const [cartItems, setCartItems ]= useState([])
  const [isLoading, setIsLoading]=useState(true)
  const[isClicked, setIsClicked]= useState(false)
  const [isNotEmpty, setIsNotEmpty]=useState(false)
async function getCart(){
  try{
    let response = await getCartProduct()
    setCartItems(response.data.data.products)
    setIsLoading(false)
  } catch(err){
    console.log(err)
    setIsLoading(true)
  }
 
 
}
useEffect(()=>{

  if(cartItems.length > 0){
    setIsNotEmpty(true)
  }
  else{
    setIsNotEmpty(false)
  }
},[cartItems])
useEffect(()=>{
  getCart()

},[])
function toggleDropDowon(){
  setIsClicked(!isClicked)
}
async function deleteItem(productId){
  let response = await deleteCartProduct(productId)
  setCartItems(response.data.data.products)

 console.log(response)
}
async function updateItem(productId, count){
  let response = await updateCartProduct(productId, count)
  setCartItems(response.data.data.products)

 console.log(response)
}

async function clearCart(){
  let response = await clearCartProduct()
 
 if(response.data.message == "success"){
setCartItems([])
 }
 console.log(response)
}


  return (
   <>
   

<div className="container px-20 mx-auto my-32">
  {isLoading && <Loader />}
  {/* Page Header */}
  <div className="flex justify-between p-3">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
    </Helmet>

   
 <div className="mb-8 text-start">
          <h1 className="text-3xl font-bold mb-2 text-card-foreground">Cart</h1>
          <p className="text-card-foreground/90">Review your items, make any changes, and proceed to checkout.</p>
        </div>
    {cartItems.length > 0 && (
      <Button
        variant="destructive"
        onClick={clearCart}
        className="px-5 py-2"
      >
        Clear Cart
      </Button>
    )}
    
  </div>
       
       
  {/* Cart Table */}
  <Card className="overflow-hidden shadow-md">
   
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32"></TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Qty</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cartItems.map((item) => (
          <TableRow key={item.product.id}>
            
            {/* Image */}
            <TableCell>
              <img
                src={item.product.imageCover}
                className="w-16 md:w-32 rounded"
                alt={item.product.title}
              />
            </TableCell>

            {/* Title */}
            <TableCell className="font-semibold">
              {item.product.title}
            </TableCell>

            {/* Quantity Controls */}
            <TableCell>
              <div className="flex items-center gap-3">
                
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateItem(
                      item.product.id,
                      item.count - 1 <= 0
                        ? deleteItem(item.product.id)
                        : item.count - 1
                    )
                  }
                >
                  <Minus className="w-3 h-3" />
                </Button>

                <span>{item.count}</span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() =>
                    updateItem(item.product.id, item.count + 1)
                  }
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </TableCell>

            {/* Unit Price */}
            <TableCell className="font-semibold">
              {item.price} EGP
            </TableCell>

            {/* Total */}
            <TableCell className="font-semibold">
              {item.price * item.count} EGP
            </TableCell>

            {/* Remove */}
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="text-red-600"
                onClick={() => deleteItem(item.product.id)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>

  {/* Bottom Total + Payment */}
  {isNotEmpty ? (
    <Card className="mt-6 p-4 flex items-center justify-between">
      {/* Total Price Label */}
      <div className="text-lg font-medium">Total Price:</div>

      {/* Total Price Value */}
      <div className="text-xl font-semibold">{totalPrice} EGP</div>

      {/* Payment Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-700 hover:bg-green-800 text-white">
            Payment Method
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Link
              to="/checkout"
              state={{ type: "online Payment" }}
              className="w-full"
            >
              Online Payment
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              to="/checkout"
              state={{ type: "Cash on delivery" }}
              className="w-full"
            >
              Cash On Delivery
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  ) : (
    <div className="flex flex-col justify-center items-center text-center py-10">
      <h1 className="text-4xl py-10">Cart is empty</h1>
      <Link
        to="/"
        className="bg-red-800 text-white px-5 py-2 rounded-md"
      >
        Back to Home
      </Link>
    </div>
  )}
</div>


   </>
  )
}
