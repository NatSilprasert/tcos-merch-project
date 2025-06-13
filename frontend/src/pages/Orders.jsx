import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Orders = () => {

    const { backendUrl, token } = useContext(ShopContext); 
    const [ orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
          if (!token) {
            return null
          }
    
          const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
          
          if (response.data.success) {
            let allOrderItem = []
            response.data.orders.map((order) => {
              order.items.map((item) => {
                item['orderId'] = order.orderId
                item['status'] = order.status  
                item['payment'] = order.payment  
                item['paymentMethod'] = order.paymentMethod
                item['date'] = order.date
                allOrderItem.push(item)
              })
            })
            setOrderData(allOrderItem.reverse());
          }
    
        } catch (error) {
          console.log(error)
          res.json({success: false, message: error.message})
        }
      }
    
      useEffect(() => {
        loadOrderData()
      }, [token])

    return (
        <div className='pt-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex gap-2 items-center mb-3'>
                <div className='text-2xl'>
                    MY ORDERS
                </div>
                <p className='mb-2 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
            </div>
            
            <div>
                {
                orderData.map((item, key) => (
                    <div key={key} className='py-4 border-b border-gray-400 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start md:items-center gap-6 text-sm'>
                        <img className='w-16 sm:w-20' src={item.banner[0]} alt="" />
                        <div className='flex flex-col '>
                            <p className='sm:text-base font-medium'>{item.name}</p>
                            <div className='flex items-center gap-3 mt-1 text-base text-[14px]'>
                                <p>฿{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p className={`${item.sizeAvailable ? 'flex' : 'hidden'}`}>Size: {item.size}</p>
                            </div>
                            <p>Date: <span className='text-gray-400 mt-1'>{new Date(item.date).toDateString()}</span></p>
                            <p>Payment: <span className='text-gray-400 mt-1'>{item.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between mr-4'>
                        <p className='text-sm'>ORDER ID --- {item.orderId}</p>
                        <div className='flex items-center gap-2'>
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm mt-1'>{item.status}</p>
                        </div>
                    </div>
                    </div>
                ))
                }
            </div>    
        </div>
    )
}

export default Orders
