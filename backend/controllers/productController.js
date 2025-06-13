import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, sizes, sizeAvailable } = req.body

        const banner = req.files && req.files.banner && req.files.banner[0];
        const image1 = req.files && req.files.image1 && req.files.image1[0];
        const image2 = req.files && req.files.image2 && req.files.image2[0];
        const image3 = req.files && req.files.image3 && req.files.image3[0];
        const image4 = req.files && req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let bannerUrl;
        if (banner) {
            let bannerResult = await cloudinary.uploader.upload(banner.path, {resource_type: 'image'});
            bannerUrl = bannerResult.secure_url;
        }

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                    return result.secure_url
                })
            )
        }

        let parsedSizes = [];
        if (sizes) {
            try {
                parsedSizes = JSON.parse(sizes);
                if (!Array.isArray(parsedSizes)) parsedSizes = [];
            } catch (e) {
                parsedSizes = [];
            }
        }

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            sizes: parsedSizes,
            sizeAvailable: sizeAvailable,
            stock: Number(stock),
            date: Date.now()
        };
        if (bannerUrl) {
            productData.banner = bannerUrl;
        }

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// function for edit product
const updateProduct = async (req, res) => {

    try {
      
        const { id, name, description, price, stock, sizes, sizeAvailable } = req.body

        const banner = req.files && req.files.banner && req.files.banner[0];
        const image1 = req.files && req.files.image1 && req.files.image1[0];
        const image2 = req.files && req.files.image2 && req.files.image2[0];
        const image3 = req.files && req.files.image3 && req.files.image3[0];
        const image4 = req.files && req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let bannerUrl;
        if (banner) {
            let bannerResult = await cloudinary.uploader.upload(banner.path, {resource_type: 'image'});
            bannerUrl = bannerResult.secure_url;
        }

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                    return result.secure_url
                })
            )
        }

        let parsedSizes = [];
        if (sizes) {
            try {
                parsedSizes = JSON.parse(sizes);
                if (!Array.isArray(parsedSizes)) parsedSizes = [];
            } catch (e) {
                parsedSizes = [];
            }
        }

        
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            sizes: parsedSizes,
            sizeAvailable: sizeAvailable === 'true' ? true : false,
            stock: Number(stock),
            date: Date.now()
        }
        if (bannerUrl) {
            productData.banner = bannerUrl;
        }
        
        const products = await productModel.findByIdAndUpdate(id, {...productData})

        res.json({success: true, message: 'Product Updated!'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})    
    }

}

// function for list product
const listProduct = async (req, res) => {

    try {
        
        const products = await productModel.find({});
        res.json({success: true, products})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})    
    }

}

// function for removing product
const removeProduct = async (req, res) => {

    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// function for single product info 
const singleProduct = async (req, res) => {

    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

export { addProduct, updateProduct, listProduct, removeProduct, singleProduct}