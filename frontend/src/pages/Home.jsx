import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import Hero from '../components/Hero'
import MerchSection from '../components/MerchSection'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {

  const { token, backendUrl } = useContext(ShopContext);
  const [ products, setProducts ] = useState([]);

  const fetchProductData = async () => {
    try {
            
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
          setProducts(response.data.products)
      } else {
          toast.error(response.data.message)
      }

  } catch (error) {
      console.log(error)
      toast.error(error.message)
  }

  }
  useEffect(() => {
    fetchProductData();
  }, [token])

  return (
    <div>
      <Hero/> 
      <MerchSection products={products}/>
    </div>
  )
}

export default Home
