import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, require:true },
    description: { type: String, require:true },
    price: { type: Number, require:true },
    image: { type: Array, require:true },
    banner: { type: Array, require:true },
    sizes: { type: Array, require:true },
    sizeAvailable: { type: Boolean },
    stock: {type: Number, require:true},
    date: { type: Number, require: true },
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel