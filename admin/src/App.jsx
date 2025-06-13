import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react'
import { ProductContext } from './context/productContext'

const App = () => {

  const { token, backendUrl } = useContext(ProductContext);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      { token === "" 
      ? <Login />
      : <>
      <Navbar />
      <div className='flex w-full'>
        <Sidebar/>
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Routes>
          <Route path='/' element={<orders />} />
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        </div>
      </div>
      </>
      } 

    </div>
  )
}

export default App
