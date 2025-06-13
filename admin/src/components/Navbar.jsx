import React from 'react'
import { assets } from '../assets/assets'
import { ProductContext } from '../context/ProductContext'
import { useContext } from 'react'

const Navbar = () => {

  const { token, setToken } = useContext(ProductContext)

  return (
    <div className='w-full flex items-center py-4 px-4 md:px-8 justify-between border-b border-gray-300 bg-black'>
      <img className='w-16' src={assets.logo} alt="" />
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar