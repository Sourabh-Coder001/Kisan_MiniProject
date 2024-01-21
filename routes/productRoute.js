import express from 'express';
import { isAdmin, requireSignIn } from '../middelwares/authMiddelware.js';
import { brainTreeTokenController, braintreePaymentController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router=express.Router()

//routes

router.post('/createproduct',requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get('/getproduct',getProductController);

//single products
router.get('/getproduct/:slug',getSingleProductController);

//get photo
router.get('/productphoto/:pid',productPhotoController);

//delete product
router.delete('/deleteproduct/:pid',deleteProductController);

//update-product
router.put('/updateproduct/:pid',requireSignIn,isAdmin,formidable(),updateProductController);

//filter products
router.post('/productfilter',productFilterController);

//Product Count
router.get('/productcount',productCountController);

//product page 
router.get('/productlist/:page',productListController);

// search
router.get('/search/:keyword',searchProductController);

//similar product
router.get('/relatedproduct/:pid/:cid',relatedProductController);

// Category wise product

router.get('/productcategory/:slug',productCategoryController);

//Payment routes
//token
router.get('/braintree/token',brainTreeTokenController);

//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController);
export default router;