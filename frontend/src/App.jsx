import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import { ToastContainer, toast } from 'react-toastify' 
import Login from './pages/Login'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
