import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SquarePen, Trash2, X } from 'lucide-react';
import Update from '../components/Update';
import { createContext } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext.jsx';

export const ListContext = createContext();

const List = () => {

    const [list, setList] = useState([]);
    const { openEdit, setOpenEdit, token, backendUrl } = useContext(ProductContext);

    const fetchList = async () => {
        try {
            
            const response = await axios.get(backendUrl + "/api/product/list")
            
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
           console.log(error);
           toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {

            const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})
            
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
      fetchList()
    },[list]);

    return (
        <div className='relative'>
            <p className='pb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                
                {/* --- List Table Title --- */}

                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-400 bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Stock</b>
                    <b>Price</b>
                    <b className='text-center'>Edit</b>
                </div>

                {/* --- Product List --- */}

                {
                    list.map((item, index) => (
                      <div key={index}>
                        <div className='grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm'>
                            <img className='w-12' src={item.banner[0]} alt="" />
                            <p>{item.name}</p>
                            <p className='ml-2'>{item.stock}</p>
                            <p>฿{item.price}</p>
                            <div className='right-0 flex justify-center gap-2'>
                              <SquarePen onClick={() => setOpenEdit(item._id)} className='md:text-center cursor-pointer'/>                         
                              <Trash2 onClick={() => removeProduct(item._id)} className=' md:text-center cursor-pointer'></Trash2>
                            </div>
                        </div>
                        
                        {/* Edit Panel */}
                        {openEdit === item._id && ( 
                          <div>
                            <Update products={list} productId={item._id} />
                          </div>
                        )}

                      </div>
                        
                    ))
                }

            </div>

        </div>
    )
}

export default List
