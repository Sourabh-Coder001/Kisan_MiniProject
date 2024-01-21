import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";


export const createCategoryController=async(req,res)=>{
    try{
        const{name}=req.body
        if(!name){
            return res.status(401).send({message:'Name is required'});
        }
        const existCategory=await categoryModel.findOne({name})
        if(existCategory){
            return res.status(200).send({
                success:true,
                message:'Category Already Exists'
            })
        }
        const category=await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new Category created',
            category,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Category'
        })
    }
}; 

export const updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
  
      // Assuming categoryModel is your Mongoose model for categories
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) }, // Assuming you have a 'slug' field in your category schema
        { new: true }
      );
  
      if (!category) {
        return res.status(404).send({
          success: false,
          message: 'Category not found',
        });
      }
  
      return res.status(200).send({
        success: true,
        message: 'Category updated successfully',
        category,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        error: error.message, // Send specific error message for debugging
        message: 'Error while updating category',
      });
    }
  };

//get all categories
export const categorysController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        
        res.status(200).send({
            success: true,
            message: 'All Categories List',
            category,
        });
    } catch (error) {
        console.error(error);

        res.status(500).send({
            success: false,
            error: error.message, // Send specific error message for debugging
            message: 'Error while getting all Categories',
        });
    }
};

//get single Category
export const singleCategoryController=async(req,res)=>{
    try{
        
        const category=await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting Single Category'
        })
    }
};
//delete category
export const deleteCategoryController=async(req,res)=>{
    try{
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Deleted Successfully',
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting category',
            error
        })
    }
};