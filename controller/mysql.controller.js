import { Categorymodel } from "../schema/mysql.schema.js";

async function addCategory(req,res,next){
    try{
        const {name} = req.body;
        if(!name){
            res.status(400).send("Category not found")
        }
        // const newCategory = await new categoryModel({name}).save();
        const newCategory = await Categorymodel.create({name});
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
        // const allCategory = await categoryModel.find();
        const allCategory = await Categorymodel.findAll();
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
        // const category = await categoryModel.findByIdAndUpdate(id,{name},{new:true});
        const category = await Categorymodel.update(
            {name:name},
            {
                where:{
                    id:id
                }
            }
        )
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
        // const find = await serviceModel.findOne({id})
        // console.log(find)
        if(false){
            res.status(400).send({
                operation:"fail",
                reason:"Category is linked to service"
            })
        }else{
            // const category = await categoryModel.findByIdAndDelete(id);
            const category = await Categorymodel.destroy(
                {
                    where:{
                        id:id
                    }
                }
            );

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
    // const category = await categoryModel.findById(id)
    const category = await Categorymodel.findByPk(id)
    return category
}
export {addCategory,getCategory,updateCategory,deleteCategory, findCategory}