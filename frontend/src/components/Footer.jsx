import { Facebook, Instagram } from 'lucide-react'
import React from 'react'
import { assets } from '../assets/assets'
import CIcon from '@coreui/icons-react'
import { cibTiktok } from '@coreui/icons'

const Footer = () => {
  return (
    <div className='font-sans py-4 mt-24 px-4 sm:px-[5vw] md:-[7vw] lg:px-[9vw]'>
        <div className='flex flex-col gap-14 sm:flex-row justify-between items-center'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 items-center'><Instagram />
                    <span className='text-[8px] sm:text-[12px]'>@thecomingofstages</span>
                </div>
                <div className='flex gap-4 items-center'>
                    <Facebook /><span className='text-[8px] sm:text-[12px]'>The Coming of Stages</span>
                </div>
                <div className='flex gap-4 items-center'>
                    <img className='w-6 h-6' src={assets.tiktok} alt="" /><span className='text-[8px] sm:text-[12px]'>@thecomingofstages</span>
                </div>
            </div>

            <div>
                <img className='h-24 w-24' src={assets.tcos_logo} alt="" />
            </div>
        </div>
        
        <div className='pt-12'>
            <hr/>
            <p className='py-5 text-[8px] sm:text-[12px] text-center'>
                {`Copyright ${new Date().getFullYear()}@ thecomingofstages.com - All Right Reserved.`}
            </p>
        </div>
    </div>
  )
}

export default Footer
