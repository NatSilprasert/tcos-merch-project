import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { X } from 'lucide-react';
import { useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext';

const Update = ({products, productId}) => {

    const { openEdit, setOpenEdit, backendUrl, token } = useContext(ProductContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [banner, setBanner] = useState(false);
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState(0);

    const [sizeAvailable, setSizeAvailable] = useState(false);
    const [sizes, setSizes] = useState([]);

    const fetchProductData = async () => {

        const found = products.find((item) => item._id === productId);

        if (found) {

            setBanner(found.banner.length > 0 ? found.banner[0] : false);
            setImage1(found.image.length > 0 ? found.image[0] : false);
            setImage2(found.image.length > 1 ? found.image[1] : false);
            setImage3(found.image.length > 2 ? found.image[2] : false);
            setImage4(found.image.length > 3 ? found.image[3] : false);  

            setName(found.name);
            setDescription(found.description);
            setPrice(found.price);
            setSizeAvailable(found.SizeAvailable);
            setSizes(found.sizes);
            setStock(found.stock);
      
        }
    }

    const updateProduct = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        try {

            const formData = new FormData()
            const copyProductId = productId
            
            formData.append("id", copyProductId)
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("stock", stock)
            formData.append("sizeAvailable", sizeAvailable ? 'true' : 'false')
            formData.append("sizes", JSON.stringify(sizes))
            
            banner && formData.append("banner", banner)
            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/update", formData, {headers:{token}})
            
            if (response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
       
        setIsSubmitting(false);
        setOpenEdit(false);
       

    }

    useEffect(() => {
        fetchProductData();
    }, [])
        
    return (
        <div className={`${openEdit ? '' : 'hidden'} absolute w-full top-1 z-100 p-6 absolute bg-white border m-auto`}>
            <X onClick={() => setOpenEdit(false)} className='absolute right-6'></X>
            <form onSubmit={updateProduct} className='flex flex-col w-full items-start gap-3'>
                <div>

                    <p className='mb-2'>Upload Banner</p>

                    <div className='w-20 relative mb-2'>
                      <label htmlFor="banner">
                        <img
                          className='w-20'
                          src={
                            !banner
                              ? assets.upload_area
                              : typeof banner === "string"
                                ? banner
                                : URL.createObjectURL(banner)
                          }
                          alt=""
                        />
                        <input onChange={(e) => setBanner(e.target.files[0])} type="file" id="banner" hidden />
                        {banner && <X onClick={() => setBanner(false)} className='absolute right-0 top-0 m-1 w-4 h-4 text-white' />}
                      </label>
                    </div>

                    <p className='mb-2'>Upload Image</p>
                    <div className='flex gap-2'>
                      <label className='relative' htmlFor="image1">
                        <img
                          className='w-20'
                          src={
                            !image1
                              ? assets.upload_area
                              : typeof image1 === "string"
                                ? image1
                                : URL.createObjectURL(image1)
                          }
                          alt=""
                        />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                        {image1 && <X onClick={() => setImage1(false)} className='absolute right-0 top-0 m-1 w-4 h-4 text-white' />}
                      </label>
                      <label className='relative' htmlFor="image2">
                        <img
                          className='w-20'
                          src={
                            !image2
                              ? assets.upload_area
                              : typeof image2 === "string"
                                ? image2
                                : URL.createObjectURL(image2)
                          }
                          alt=""
                        />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden/>
                        {image2 && <X onClick={() => setImage2(false)} className='absolute right-0 top-0 m-1 w-4 h-4 text-white' />}
                      </label>
                      <label className='relative' htmlFor="image3">
                        <img
                          className='w-20'
                          src={
                            !image3
                              ? assets.upload_area
                              : typeof image3 === "string"
                                ? image3
                                : URL.createObjectURL(image3)
                          }
                          alt=""
                        />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                        {image3 && <X onClick={() => setImage3(false)} className='absolute right-0 top-0 m-1 w-4 h-4 text-white' />}
                      </label>
                      <label className='relative' htmlFor="image4">
                        <img
                          className='w-20'
                          src={
                            !image4
                              ? assets.upload_area
                              : typeof image4 === "string"
                                ? image4
                                : URL.createObjectURL(image4)
                          }
                          alt=""
                        />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                        {image4 && <X onClick={() => setImage4(false)} className='absolute right-0 top-0 m-1 w-4 h-4 text-white' />}
                      </label>
                    </div>
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Type here' required />
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product description</p>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border h-50' type="text" placeholder='Write content here' required />
                </div>

                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                    <div>
                        <p className='mb-2'>Product Price</p>
                        <input onChange={(e) => setPrice(e.target.value)} value={price} className='border w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='0' />
                    </div>

                    <div>
                    <p className='mb-2'>Stock</p>
                    <input onChange={(e) => setStock(e.target.value)} value={stock} className='border w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='0' />
                </div>

                </div>
                
                {sizeAvailable ?
                    <div>
                        <p className='mb-2'>Product Sizes</p>
                        <div className='flex gap-3'>
                            <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item != "S") : [...prev, "S"])}>
                                <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item != "M") : [...prev, "M"])}>
                                <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item != "L") : [...prev, "L"])}>
                                <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item != "XL") : [...prev, "XL"])}>
                                <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("2XL") ? prev.filter(item => item != "2XL") : [...prev, "2XL"])}>
                                <p className={`${sizes.includes("2XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>2XL</p>
                            </div>
                            <div onClick={() => setSizes(prev => prev.includes("3XL") ? prev.filter(item => item != "3XL") : [...prev, "3XL"])}>
                                <p className={`${sizes.includes("3XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>3XL</p>
                            </div>
                        </div>
                    </div> : <div></div>
                }

                <div className='flex gap-2 mt-2'>
                    <input onChange={() => setSizeAvailable(prev => !prev)} checked={sizeAvailable} type="checkbox" id='sizeAvailable' />
                    <label className='cursor-pointer' htmlFor="sizeAvailable">Size?</label>
                </div>

                <button 

                    disabled={isSubmitting}
                    type='submit' 
                    className='w-28 py-3 mt-4 bg-black text-white'
                >
                    {isSubmitting ? "Updating..." : "Update"}
                </button>

            </form>
        </div>
    )
}

export default Update
