import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { DiamondPlusIcon, LucideGitPullRequestClosed, SquareMinusIcon, SquarePlusIcon, Trash2 } from 'lucide-react';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, cartItems, setCartItems, updateQuantity, delivery_fee, getCartAmount, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  const clearCart = () => {
    setCartItems({});
    localStorage.clear();
  }

  useEffect(() => {

    const tempData = [];

    for (const items in cartItems) {

      const product = products.find((p) => p._id === items)
      if (!product) continue;

      if (product.sizeAvailable) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }   
      } else {
        if (cartItems[items] > 0) {
          tempData.push({
            _id: items,
            size: false,
            quantity: cartItems[items]
          })
        }
      }
    }

    setCartData(tempData);
    
  }, [cartItems, products]);

  
  return (
    <div className='pt-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div className='flex gap-2 items-center mb-3'>
        <div className='text-2xl'>
          YOUR CART
        </div>
        <p className='mb-2 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
      </div>

      { cartData.length > 0 ? (
        <div>
          {
            cartData.map((item, key) => {

              const productData = products.find((product) => product._id === item._id)
              
              return (
                <div
                  key={key}
                  className='py-4 border-b border-white/50 grid grid-cols-[4fr_2fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                >
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.banner} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>
                        {`${productData.name} ${productData.sizeAvailable ? `(${item.size})` : ''}`}
                      </p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='pt-1'>฿{productData.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex gap-2 items-center'>
                    <SquareMinusIcon
                      className='w-5 h-5 cursor-pointer hover:scale-105'
                      onClick={() =>
                        item.quantity > 1 &&
                        updateQuantity(item._id, item.size, Number(item.quantity) - 1)
                      }
                    />
                    <input
                      onChange={(e) =>
                        e.target.value === '' || e.target.value === '0'
                          ? null
                          : updateQuantity(item._id, item.size, Number(e.target.value))
                      }
                      className='w-4 font-sans font-bold text-center'
                      type="number"
                      min={1}
                      value={item.quantity}
                      readOnly
                    />
                     <SquarePlusIcon
                      className='w-5 h-5 cursor-pointer hover:scale-105'
                      onClick={() => updateQuantity(item._id, item.size, Number(item.quantity) + 1)}
                    />
                  </div>

                  <Trash2
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    className='w-5 h-5 mr-4 sm:w-5 cursor-pointer' 
                  />
                </div>
              )
            })
          }
        </div>
        ) : (
          <>
            <div className=' py-16 sm:py-24 text-l text-center'>
              CART EMPTY
            </div>
            <hr className='text-white/50'/>
          </>
        )
      }
      <button onClick={() => clearCart()} className='bg-white text-black text-sm mt-4 px-8 py-3'>CLEAR CART</button>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          
  
            <CartTotal/>
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-white text-black text-sm my-8 px-8 py-3'>CONFIRM</button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
