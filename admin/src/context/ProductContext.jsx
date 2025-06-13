import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'

export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [openEdit, setOpenEdit] = useState('');

    const value = {
        backendUrl, openEdit, setOpenEdit, token, setToken
    }

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <ProductContext.Provider value={value}>
                {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
