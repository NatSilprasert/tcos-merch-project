import React, { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const { products, delivery_fee, token, backendUrl, navigate, method, setMethod, cartItems, setCartItems, getCartAmount } = useContext(ShopContext);

    const [QR, setQR] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [slip, setSlip] = useState(null);
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        address:'',
        zipcode:'',
        phone:''
    });

    const generateOrderId = () => {
        const newId = Math.floor(100000 + Math.random() * 900000);
        setOrderId(newId);
    }

    const generateQR = async () => {
        
        const amount = getCartAmount()
        const response = await axios.post(backendUrl + '/api/order/generateQR', {amount}, {headers:{token}})

        if (response.data.success) {
            setQR(response.data.qr)
            
        } else {
            toast.error(response.data.message)
        }

    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]:value}))
    }
                                                                                                                                                                                                                    
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            
            let orderItems = []

            for (const items in cartItems) {

                const product = products.find((p) => p._id === items)
                const itemInfo = structuredClone(product)

                if (product.sizeAvailable) {
                    for (const item in cartItems[items]) {
                        if (cartItems[items][item] > 0) {              
                            if (itemInfo) {
                                itemInfo.size = item
                                itemInfo.quantity = cartItems[items][item]
                                orderItems.push(itemInfo)
                            }
                        }
                    }
                } else {
                    if (cartItems[items] > 0) {
                        if (itemInfo) {
                            itemInfo.size = false
                            itemInfo.quantity = cartItems[items]
                            orderItems.push(itemInfo)
                        }
                    }
                }

            }
            
            let orderData = {
                orderId: orderId,
                paymentMethod: method,
                address: formData,
                slip: slip,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
            
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                toast.error(response.data.message)
            }
           
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        generateQR()
        generateOrderId()
    }, [token])

    return (
    <form onSubmit={onSubmitHandler}>
        <div className='pt-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                
                {/* Left Side */}
                <div className='flex flex-col gap-4 w-full lg:max-w-[480px]'>
                    <div className='text-xl sm:text-2xl my-3'>  
                        <div className='flex gap-2 items-center'>
                            <div className='text-2xl'>
                                INFORMATION
                            </div>
                            <p className='mb-2 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
                        </div>
                    </div>
                
                    <div className='flex gap-3'>
                        <input
                            onChange={onChangeHandler}
                            name='firstName'
                            value={formData.firstName}
                            className='border border-white rounded py-1.5 px-3.5 w-full' 
                            placeholder='ชื่อ'
                            type="text" 
                            required
                        />
                        <input
                            onChange={onChangeHandler}
                            name='lastName'
                            value={formData.lastName}
                            className='border border-white rounded py-1.5 px-3.5 w-full' 
                            placeholder='นามสกุล'
                            type="text" 
                            required
                        />
                    </div>
                    <input
                        onChange={onChangeHandler}
                        name='email'
                        value={formData.email}
                        className='border border-white rounded py-1.5 px-3.5 w-full' 
                        placeholder='อีเมล'
                        type="email" 
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        name='address'
                        value={formData.address}
                        className={`border border-white rounded py-1.5 px-3.5 w-full ${method === 'delivery' ? 'flex' : 'hidden'}`}
                        placeholder='ที่อยู่จัดส่ง'
                        type="text"
                        required={method === 'delivery'}
                    />
                    <div className='flex gap-3'>
                        <input
                            onChange={onChangeHandler}
                            name='zipcode'
                            value={formData.zipcode}
                            className={`border border-gray-300 rounded py-1.5 px-3.5 w-full ${method === 'delivery' ? 'flex' : 'hidden'}`} 
                            placeholder='ไปรษณีย์'
                            type="number" 
                            required={method === 'delivery'}
                        />
                        <input
                            onChange={onChangeHandler}
                            name='phone'
                            value={formData.phone}
                            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                            placeholder='เบอร์ติดต่อ'
                            type="number" 
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-3 mt-1'>
                        <p className='flex items-center w-full'>Slip Here</p>
                        <input
                            onChange={(e) => setSlip(e.target.files[0])}
                            name='slip'
                            className='border border-white rounded py-1.5 px-3.5 w-full font-sans text-gray-400'
                            placeholder='choose file'
                            type="file"
                            required
                        />
                    </div>
                    {/* <div className='flex gap-3'>
                        <input
                            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                            placeholder='Zipcode'
                            type="number" 
                        />
                        <input
                            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                            placeholder='Country'
                            type="text" 
                        />
                        <input
                            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                            placeholder='Country'
                            type="text" 
                        />
                    </div> */}
                    {/* <input
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        placeholder='Phone'
                        type="number" 
                    /> */}

                        <div className='my-4 mb-2 flex gap-2 items-center'>
                            <div className='text-xl'>
                                Payment Method
                            </div>
                            <p className='mb-2 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
                        </div>
                        {/* --- Payment Method Selection --- */}
                        <div className='w-full flex gap-3 flex-col lg:flex-row'>
                            <div onClick={() => setMethod("delivery")} className={`bg-black flex-1 flex items-center gap-3 p-2 px-3 cursor-pointer border ${method === 'delivery' ? 'border-white' : 'border-white/50'}`}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'delivery' ? 'border-5' : ''}`}></p>
                                <p className='pt-1 text-white text-sm font-medium mx-4'>VIA DELIVERY</p>
                            </div>
                            <div onClick={() => setMethod("staff")} className={`bg-black flex-1 flex items-center gap-3 p-2 px-3 cursor-pointer border ${method === 'staff' ? 'border-white' : 'border-white/50'}`}>
                                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'staff' ? 'border-5' : ''}`}></p>
                                <p className='pt-1 text-white text-sm font-medium mx-4'>VIA STAFF</p>
                            </div>
                        </div>
                        
                </div>

                {/* Right Side */}
                <div>
                    <div className='mt-8 flex flex-col items-center'>

                        <div className='mt-8  min-w-80 lg:min-w-120'>
                            <CartTotal className=''/>
                        </div>

                        <div className='mt-12 flex flex-col items-center'>
                            {/* Generate QR */}
                            <p className='text-l'>SCAN TO PURCHASE</p>
                            {QR && <img src={QR} alt="QR Code" className='w-64 h-64' />}
                            <p className='text-sm'>ORDER ID --- {orderId}</p>
                        </div>

                    </div>
                    <div className='w-full text-center md:text-end mt-12'>
                        <button 
                            type='submit'
                            className='bg-white  text-black px-16 py-3 pb-2 text-sm'
                        >
                            PLACE ORDER
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </form>
    )
}

export default PlaceOrder
