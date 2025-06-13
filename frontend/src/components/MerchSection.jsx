import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const MerchSection = () => {

    const { products } = useContext(ShopContext);

    return (
        <div className='flex flex-col w-full mt-24 items-center'>
            <div className='text-2xl md:text-4xl lg:text-5xl text-center'>
                Our Merch
            </div>
            
            <section className='grid grid-cols-2 md:grid-cols-3 lg:gap-4 pt-12 md:pt-16 lg:px-4'>
                {products.map((product, key) => (
                    <a href={`/product/${product._id}`} key={key} className='relative flex items-center justify-center group'>
                        <img src={product.banner} alt="" className="w-full h-auto" />
                        <div className='absolute inset-0 flex items-center justify-center bg-black/40 lg:bg-black/80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300'>
                            <span className="text-[22px] sm:text-3xl lg:text-4xl text-white">{product.name}</span>
                        </div>
                    </a>
                ))}
            </section>
        </div>
    )
}

export default MerchSection
