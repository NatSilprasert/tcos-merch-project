import express from 'express'
import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, generateQR} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import orderModel from '../models/orderModel.js'
import upload from '../middleware/multer.js';

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post(
    '/place',
    authUser,
    upload.fields([{ name: 'slip', maxCount: 1 },]),
    placeOrder
)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/generateQR', authUser, generateQR)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

// verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter