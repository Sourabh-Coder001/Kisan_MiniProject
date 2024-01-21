import  express  from "express";
import {registerController,loginController, testController, forgotPasswordController, updateController, getOrderController, getAllOrderController, orderStatusController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middelwares/authMiddelware.js";
//route object

const router=express.Router()

//Routing
//Register || Method post
router.post("/register",registerController);


//LOGIN||POST
router.post("/login",loginController);

//Forgot Password || POST
router.post("/forgotPassword",forgotPasswordController);

// test routes
router.get("/test",requireSignIn,isAdmin, testController);

//protected USer route auth
router.get("/userauth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//protected Admin route auth
router.get("/adminauth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//updated Profile
router.put('/profile',requireSignIn,updateController);

//orders
router.get('/orders',requireSignIn,getOrderController);

// all orders
//orders
router.get('/allorders',requireSignIn,isAdmin,getAllOrderController);

//order update
router.put('/orderstatus/:orderId',requireSignIn,isAdmin,orderStatusController);
export default router;