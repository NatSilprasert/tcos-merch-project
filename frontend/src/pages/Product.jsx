import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Product = () => {

  const { productId } = useParams();
  const { products, addToCart, token, navigate} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const found = products.find((item) => item._id === productId);
    if (found) {
        setProductData(found);
        setImage(found.image[0]);
    }
  } 

  useEffect(() => {
      fetchProductData();
  },[productId, products]);

  return productData ? (
    <div className='px-4 sm:px-8 pt-24 animate-fade-in-delay-1 opacity-0'>
      <Link to='/'><ArrowLeft className='h-8 w-8 mb-4 flex md:hidden'/></Link>
      {/* Product Data */}
      <div className='flex gap-12 flex-col md:flex-row'>
        {/* --- Product Images --- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 sm:justify-normal sm:w-[18.7%] w-full'>
                {
                    productData.image.map((item, key) => (
                        <img
                            onClick={() => setImage(item)}
                            src={item} 
                            key={key} 
                            alt="" 
                            className='w-[24%] sm:w-full flex-shrink-0 cursor-pointer'
                        />
                    ))
                }
            </div>
            <div className='w-full sm:w-[80%]'>
                <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>

        {/* --- Product Info --- */}
        <div className='flex-1'>
          <h1 className='font-medium text-xl md:text-2xl mt-2'>{productData.name}</h1>
          <p className='mt-5 text-3xl md:text-4xl font-medium'>฿{productData.price}</p>
          <p className='mt-5 md:w-4/5 text-[14px]'>{productData.description}</p>
          {productData.sizeAvailable ? (
            <div className='flex flex-col gap-4 my-8 mb-0'>
              <p className='text-[14px]'>Select Size</p>
                <div className='flex gap-2'>
                  {productData.sizes.map((item, key) => (
                      <button 
                          onClick={() => setSize(item)}
                          className={`border py-2 pb-1 px-4 text-[12px] ${item === size ? "bg-white text-black" : "border-white bg-black text-white"}`} 
                          key={key}  
                      >
                          {item}
                      </button>
                  ))}
                </div>
            </div>
          ) : <div className='opacity-0'></div>}
          <button 
              onClick={() => token
                ? addToCart(productId, size, productData.sizeAvailable)
                : navigate('/login')
              }
              className='bg-white mt-8 text-black w-full rounded-full sm:w-4/5 py-3 pb-2 text-sm active:bg-gray-700'
          >
              ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5 border-t border-white'/>
         </div>
      </div>
    </div>
  ) : <div className='opacity:0'></div>
}

export default Product
