import categoryModel from "../schema/category.schema.js";
import { serviceModel } from "../schema/service.schema.js";

async function addCategory(req,res,next){
    try{
        const {name} = req.body;
        if(!name){
            res.status(400).send("Category not found")
        }
        const newCategory = await new categoryModel({name}).save();
        res.status(200).send({
            "operation":"success",
            category:newCategory
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

async function getCategory(req,res,next){
    try{
        const allCategory = await categoryModel.find();
        res.status(200).send({
            "operation":"success",
            category:allCategory
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}


async function updateCategory(req,res,next){
    try{
        const id = req.params.categoryId;
        const {name} = req.body;
        const category = await categoryModel.findByIdAndUpdate(id,{name},{new:true});
        res.status(200).send({
            "operation":"success",
            category:category
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

async function deleteCategory(req,res,next){
    try{
        const id = req.params.categoryId;
        const find = await serviceModel.findOne({id})
        console.log(find)
        if(find){
            res.status(400).send({
                operation:"fail",
                reason:"Category is linked to service"
            })
        }else{
            const category = await categoryModel.findByIdAndDelete(id);
            res.status(200).send({
                "operation":"success",
            })
        }
    }catch(err){
        console.log(err)
        next(err)
    }
}


async function findCategory(id){
    const category = await categoryModel.findById(id)
    return category
}
export {addCategory,getCategory,updateCategory,deleteCategory, findCategory}