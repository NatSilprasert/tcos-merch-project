import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Minus, ShoppingCart, User, X } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Header = () => {

    const { navigate, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const [dropMenuShown, setDropMenuShown] = useState(false);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        setDropMenuShown(false);
    }

    return (
        <nav className='fixed w-full items-center z-40 top-0 bg-black px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            
            <div className='flex items-center justify-between font-medium py-5'>
                <Link to='/'><img src={assets.tcos_logo} className="h-[48px]" alt="" /></Link>

                <div className='flex gap-6 items-center'>
                    <ul className='hidden sm:flex gap-5 text-sm text-white'>
                        <div className='flex flex-col items-center gap-1'>
                            <a href='https://linktr.ee/thecomingofstages_documentary?utm_source=linktree_admin_share&fbclid=PAZXh0bgNhZW0CMTEAAaaC45ozK93iGOUj_dmeCmfEM0Pzr2dT35lfQrKNvsz30gajmBKRXl3NUUM_aem_a-7gkXZCgy6Jn-6INV9ANg' target="_blank" >MORE</a>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <a href='https://thecomingofstages.com/donate' target="_blank">SUPPORT US</a>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                        </div> 
                    </ul>

                    <Minus className='text-white rotate-90 hidden sm:flex'/>
                    
                    <Link className='relative' to={token ? '/cart' : '/login'}>
                        <ShoppingCart className='text-white cursor-pointer'/>
                        <p 
                            className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-white text-black aspect-square rounded-full text-[8px] font-bold font-sans'
                        >
                            {getCartCount()}
                        </p> 
                    </Link>
                    <div onClick={() => setDropMenuShown(!dropMenuShown)} className='relative hidden md:flex'>
                        <User className='text-white cursor-pointer'/>
                    </div>
                    {/* Dropdown Menu */}
                
                    <div className={`${dropMenuShown ? 'sm:block' : 'sm:hidden'} hidden absolute dropdown-menu top-22 md:right-[7vw] lg:right-[9vw]`}>
                        <div className='flex flex-col gap-2 w-36 py-3 pt-4 px-5 bg-gray-900 text-gray-500 rounded-b'>
                            <p onClick={() => (navigate('/orders'), setDropMenuShown(false))} className='cursor-pointer text-[14px] hover:text-white select-none'>Orders</p>
                            <Link onClick={() => (setVisible(false), setDropMenuShown(false), logout())} className='cursor-pointer text-[14px] hover:text-white select-none' to='/login'>{token ? 'Logout' : 'Sign In'}</Link>
                        </div>
                    </div>
                    

                    <button 
                        onClick={() => setVisible((prev) => !prev)} 
                        className="text-white cursor-pointer sm:hidden z-50"
                    > 
                        {visible ? <X size={24} /> : <Menu size={24} />} 
                    </button>
                </div>

                {/* Sidebar menu for small screen */}
                <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className='flex flex-col space-y-8 text-xl text-center'>
                        <Link onClick={() => setVisible(false)} className="text-white" to='/'>HOME</Link>
                        {token && <Link onClick={() => setVisible(false)} className="text-white" to='/orders'>ORDERS</Link>}
                        <a onClick={() => setVisible(false)} className="text-white" href='https://thecomingofstages.com/donate' target="_blank">SUPPORT US</a>
                        <a onClick={() => setVisible(false)} className="text-white" href='https://linktr.ee/thecomingofstages_documentary?utm_source=linktree_admin_share&fbclid=PAZXh0bgNhZW0CMTEAAaaC45ozK93iGOUj_dmeCmfEM0Pzr2dT35lfQrKNvsz30gajmBKRXl3NUUM_aem_a-7gkXZCgy6Jn-6INV9ANg' target="_blank">MORE</a>
                        <Link onClick={() => (setVisible(false),logout())} className="text-white" to='/login'>{token ? 'LOGOUT' : 'SIGN IN'}</Link>
                    </div> 
                </div>

            </div> 
        </nav>
    )
}

export default Header
