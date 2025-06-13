import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const { getCartAmount, delivery_fee, method, } = useContext(ShopContext);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        if (method === 'delivery') {
            setFee(delivery_fee);
        } else {
            setFee(0);
        }
    }, [method])

    return (
        <div className='w-full'>
            <div className='flex gap-2 items-center mb-6'>
                <div className='text-2xl'>
                    CART TOTALS
                </div>
                <p className='mb-2 w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white'></p>
            </div>

            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between text-[12px]'>
                    <p>Subtotal</p>
                    <p>฿ {getCartAmount()}.00</p>
                </div>
                <hr className='text-white/50'/>
                <div className='flex pt-1 justify-between text-[12px]'>
                    <p>Shipping Fee</p>
                    <p>฿ {fee}.00</p>   
                </div>
                <hr className='text-white/50'/>
                <div className='flex justify-between text-[12px]'>
                    <b>Total</b>
                    <b>฿ {getCartAmount() === 0 ? 0 : getCartAmount() + fee}.00</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
