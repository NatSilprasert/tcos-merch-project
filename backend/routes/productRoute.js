import express from 'express'
import { addProduct, listProduct, removeProduct, singleProduct, updateProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
)

productRouter.post(
  '/update',
  adminAuth,
  upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  updateProduct
)

productRouter.post('/remove', adminAuth, removeProduct)
productRouter.get('/list', listProduct)
productRouter.post('/single', singleProduct)

export default productRouter