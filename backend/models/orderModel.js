import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, require: true },
    orderId: { type: String, require: true },
    items: { type: Array, require: true },
    amount: { type: Number, require: true },
    slip: { type: Array, require:true },
    address: { type: Object, require: true }, 
    paymentMethod: { type: String, require: true},
    status: { type: String, require: true, default: 'Order Placed' }, 
    date: { type: Number, require: true }, 
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)
export default orderModel;