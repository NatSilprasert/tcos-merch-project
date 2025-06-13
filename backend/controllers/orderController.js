import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

// global variables
const currency = 'THB'
const deliveryCharge = 10

// gateway initailize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    
    try {
        
        const { userId, orderId, items, amount, address, paymentMethod} = req.body;
        const slip = req.files && req.files.slip && req.files.slip[0];

        let slipUrl;
                if (slip) {
                    let slipResult = await cloudinary.uploader.upload(slip.path, {resource_type: 'image'});
                    slipUrl = slipResult.secure_url;
                }

        const orderData = {
            userId,
            orderId,
            items,
            address,
            slip: slipUrl,
            amount,
            paymentMethod,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success: true, message: "Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// All Order data for Admin Panel
const allOrders = async (req, res) => {
    try {
        
        const orders = await orderModel.find({})
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// User Order Data for Frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        
        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    } 
}

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true, message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
       
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success: true, session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})  
    }
}

// Verify Stripe
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})      
    }

}

const generateQR = async (req, res) => {
    const { amount } = req.body
    const mobileNumber = '0889913347'
    const payload = generatePayload(mobileNumber, { amount })
    const option = {
        color: {
            type: 'image/png',
            light: '#000',
            dark: '#fff'
        }
    }

    try {
        const url = await QRCode.toDataURL(payload, option)
        res.json({ success: true, qr: url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {generateQR, placeOrder, placeOrderStripe, verifyStripe, allOrders, userOrders, updateStatus}