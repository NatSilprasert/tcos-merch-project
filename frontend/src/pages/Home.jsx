import React, { useState } from 'react'
import Hero from '../components/Hero'
import MerchSection from '../components/MerchSection'

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
