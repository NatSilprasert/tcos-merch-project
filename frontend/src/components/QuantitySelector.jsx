import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const QuantitySelector = () => {

    const { updateQuantity } = useContext(ShopContext)

  return (
    <div className='flex gap-2 items-center'>
        <input
            onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, e.target.value)} 
            className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
            type="number" 
            min={1} 
            defaultValue={item.quantity} 
        />
    </div>
  )
}

export default QuantitySelector
