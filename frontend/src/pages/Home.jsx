import React, { useContext, useState } from 'react'
import Hero from '../components/Hero'
import MerchSection from '../components/MerchSection'
import { ShopContext } from '../context/ShopContext';

const Home = () => {

  const { products } = useContext(ShopContext);

  return (
    <div>
      <Hero/> 
      <MerchSection products={products}/>
    </div>
  )
}

export default Home
