import React, { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const delivery_fee = 40;
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [method, setMethod] = useState('');
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : {};
    });

    const getProductData = async () => {
        try {
            
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( token ) => {
        try {
            
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
            
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const addToCart = async (itemId, size, sizeAvailable) => {

        if (sizeAvailable && !size) {
            toast.error('Select Product Size', {
                autoClose: 1000,
                hideProgressBar: true,
            });
            return;
        }

        let cartData = structuredClone(cartItems);

        if (sizeAvailable) {
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                } else {
                    cartData[itemId][size] = 1;
                }
            } else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
        } else {
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
        }

        if (token) {
            try {
                
                const response = await axios.post(backendUrl + '/api/cart/add', {itemId, size, sizeAvailable}, {headers:{token}})
                console.log(response.data);

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        setCartItems(cartData);
        console.log(cartData)

        toast.success('added to cart!', {
            autoClose: 1000,
            hideProgressBar: true,
        });
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            // หา product ที่ตรงกับ id
            const product = products.find((p) => p._id === items);
            if (product && product.sizeAvailable) {
                // ถ้ามี sizeAvailable ให้วน loop นับแต่ละ size
                for (const size in cartItems[items]) {
                    if (cartItems[items][size] > 0) {
                        totalCount += cartItems[items][size];
                    }
                }
            } else {
                // ถ้าไม่มี sizeAvailable
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size , quantity) => {

        const product = products.find((p) => p._id === itemId);
        const sizeAvailable = product.sizeAvailable

        let cartData = structuredClone(cartItems);

        if (product.sizeAvailable) {
            cartData[itemId][size] = parseInt(quantity);
        } else {
            cartData[itemId] = parseInt(quantity);
        }

        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity, sizeAvailable}, {headers:{token}})
                console.log(response.data);

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            
            let product = products.find((p) => p._id === items);
            if (!product) continue;

            if (product.sizeAvailable) {
                for (const item in cartItems[[items]]) {
                    try {
                     if (cartItems[items][item] > 0) {
                        totalAmount += product.price * cartItems[items][item];
                     }
                    } catch (error) {
                        
                    }
                }
            } else {
                totalAmount += product.price * cartItems[items];
            }
        }

        return totalAmount;
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        getProductData();
    }, [token]);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        navigate, products, delivery_fee,
        method, setMethod, navigate,
        cartItems, setCartItems, addToCart, getCartCount, 
        updateQuantity, getCartAmount,
        token, setToken, backendUrl,
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
