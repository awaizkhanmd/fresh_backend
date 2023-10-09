import express from 'express';

const router = express.Router();




import ProductController from "../Controllers/ProductController.js";


router.post('/addproducts',ProductController.AddProduct);
router.post('/getProduct',ProductController.getProductsformBarcode);

export default router;