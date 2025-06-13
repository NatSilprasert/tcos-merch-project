import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {

    const [currentState, setCurrentState] = useState('Login');
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            
            if (currentState === 'Sign Up') {

                const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                }   else {
                    toast.error(response.data.message)
                }

            } else {

                const response = await axios.post(backendUrl + '/api/user/login', {email, password})
                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem('token', response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    },[token])

    return (
        <form onSubmit={onSubmitHandler} className='mt-[-50px] px-4 min-h-screen justify-center flex flex-col items-center w-[90%] sm:max-w-96 mx-auto gap-4 text-white'>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='prata-regular text-3xl'>{currentState}</p>
                <hr className='border-none h-[1.5px] w-8 bg-white'/>
            </div>
            {currentState !== 'Login' && (
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Name'
                    type="text" 
                    className='w-full px-3 py-2 border border-white font-sans'
                    required
                />
            )}
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email} 
                placeholder='Email'
                type="email" 
                className='w-full px-3 py-2 border border-white font-sans' 
                required
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password} 
                placeholder='Password'
                type="password" 
                className='w-full px-3 py-2 border white-800 font-sans' 
                required
            />
            <div className='w-full flex justify-between text-[12px]'>
                <p className='cursor-pointer'>Forgot your password?</p>
                {
                    currentState === 'Login' 
                    ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
                    : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
                }
            </div>
            <button className='bg-white text-black font-light px-8 pt-3 py-2 mt-4'>
                {currentState === 'Login' ? 'Sign in' : 'Sign Up'}
            </button>
        </form>
    )
}

export default Login
