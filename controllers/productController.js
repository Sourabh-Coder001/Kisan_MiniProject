import formidable from 'formidable'; // Ensure you have the necessary middleware imported
import slugify from "slugify";
import productmodel from "../models/productmodel.js";
import categoryModel from '../models/categoryModel.js';
import fs from 'fs';
import braintree from 'braintree';
import OrderModel from '../models/OrderModel.js';
import dotenv from 'dotenv';

dotenv.config();


 //PAyment getway
 var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MerchantID,
    publicKey: process.env.BRAINTREE_PUBLICKEY,
    privateKey: process.env.BRAINTREE_PRIVATEKEY,
  });
export const createProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping}=req.fields
        const {photo}=req.files
        //VAlidation
        switch(true){ 
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'description is Required'})
            case !price:
                return res.status(500).send({error:'price is Required'})
            case !category:
                return res.status(500).send({error:'category is Required'})
            case !quantity:
                return res.status(500).send({error:'quantity is Required'})
            case !photo && photo.size>10000 :
                return res.status(500).send({error:'Photo is Required and should be less than 1MB'})
        }
        const products=new productmodel({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType=photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:"Product created Successfully",
            products,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product'
        })
    }
};
//get all products
export const getProductController=async(req,res)=>{
    try{
        const products =await productmodel.find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            totalCount:products.length,
            message:"All Products",
            products
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting products',
            error:error.message
        })
    }
};

//get single product
export const getSingleProductController=async(req,res)=>{
try{
    const product=await productmodel.findOne({slug:req.params.slug}).select("-photo").populate('category')
    res.status(200).send({
        success:true,
        message:'Single Product Fetched',
        product
    });
}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error while getting single products'
    })
}
};

//get photo
export const productPhotoController=async(req,res)=>{
try{
    const product =await productmodel.findById(req.params.pid).select("photo")
    if(product.photo.data){
        res.set("Content-type",product.photo.contentType)
        return res.status(200).send(product.photo.data);
    }
}
catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error while getting photo',
        error
    })
}
};
//delete Controller
export const deleteProductController=async(req,res)=>{
try{
await productmodel.findByIdAndDelete(req.params.pid).select("-photo")
res.status(200).send({
    success:true,
    message:'Product Deleted SuccessFully'
});

}
catch(error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error while deleting Product',
        error
    })
}
};



export const updateProductController = async (req, res) => {
    const form = formidable({ multiples: true });

    try {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    error: err,
                    message: 'Error parsing form data',
                });
            }

            const { name, slug, description, price, category, quantity, shipping } = fields;
            const { photo } = files;

            // Validation
            if (!name || !description || !price || !category || !quantity || (!photo || photo.size > 10000)) {
                return res.status(500).send({
                    error: 'Please provide all necessary fields and ensure photo is less than 1MB',
                });
            }

            const products = await productmodel.findByIdAndUpdate(req.params.pid, {
                ...req.fields,
                slug: slugify(name),
            }, { new: true });

            if (photo) {
                products.photo.data = fs.readFileSync(photo.path);
                products.photo.contentType = photo.type;
            }

            await products.save();

            res.status(201).send({
                success: true,
                message: 'Product Updated Successfully',
                products,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in updating product',
        });
    }
};

export const productFilterController=async(req,res)=>{
    try{
        const{checked,radio}=req.body
        let args={}
        if(checked.length>0) args.category=checked
        if(radio.length) args.price={$gte:radio[0],$lte:radio[1]}
        const products= await productmodel.find(args);
        res.status(200).send({
            success:true,
            products,
        })

    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error While Filtering Products',
            error
        })
    }
};

export const productCountController=async(req,res)=>{
    try{
        const total=await productmodel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            message:"Error in product count",
            error,
            success:false,
        });
    }

};
// product list base on page
export const productListController=async(req,res)=>{
    try{
        const perPage=6;
        const page=req.params.page ? req.params.page:1;
        const products=await productmodel
        .find({})
        .select("-photo")
        .skip((page-1)*perPage)
        .limit(perPage)
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            products,
        });
    }
    catch(error){
        console.log(error)
        res.status(400).send({
            success:false,
            message:'Error in per page ctrl',
            error,
        });
    }
};

// search product
export const searchProductController=async(req,res)=>{
    try{
        const{keyword}=req.params;
        const result=await productmodel.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ],
        }).select("-photo");
        res.json(result);
    }
    catch(error){
        console.log(error)
         res.status(400).send({
            success:false,
            message:'Error In Search Product Api'
         });
    }
};

export const relatedProductController=async(req,res)=>{
      try {
        const {pid,cid}=req.params;
        const products= await productmodel
        .find({
            category:cid,
            _id:{$ne:pid},
        })
        .select("-photo")
        .limit(3)
        .populate("category");
        res.status(200).send({
            success:true,
            products,
        });        
      } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'error while geting related produts',
            error,
        });
      }
};
// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productmodel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };

 
//token
  export const brainTreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
  }
  
  
  export const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
          total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
          {
            amount: total,
            paymentMethodNonce: nonce,
            options: {
              submitForSettlement: true,
            },
          },
          function (error, result) {
            if (result) {
              const order = new OrderModel({
                products: cart,
                payment: result,
                buyer: req.user._id,
              }).save();
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
  