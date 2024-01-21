import express from 'express';
import{isAdmin,requireSignIn} from './../middelwares/authMiddelware.js';
import { categorysController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router=express.Router();

//routes
//create category
router.post('/createcategory',requireSignIn,isAdmin,createCategoryController);

//update Category
router.put('/updatecategory/:id',requireSignIn,isAdmin,updateCategoryController);
  //getAll  category
  router.get('/getcategorys',categorysController);

  //Single Category
  router.get('/singlecategory/:slug',singleCategoryController);

  // delete 
  router.delete('/deletecategory/:id',requireSignIn,isAdmin,deleteCategoryController);
export default router ;