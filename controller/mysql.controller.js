import { Categorymodel } from "../schema/mysql.schema.js";
import { Servicemodel } from "../schema/mysql.schema.js";

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

async function addService(req,res,next){
    try{
        const {name,type} = req.body;
        const categoryid = req.params.categoryId
        if (!name  || !categoryid){
            res.status(400).send({
                operation:"Failed",
                note:"Required name, type and categoryId"
            })
        }
        const category = findCategory(categoryid)
        if(!category){
            res.status(400).send({
                operation:"Failed",
                reason:"Category Not Found"
            })
        }
        // const newService = await new serviceModel({name,type,categoryid}).save()
        const newService = await Servicemodel.create({name,type,categoryid})
        res.status(200).send({
            operation:"Success",
            service:newService
        })
    }catch(err){
        next(err)
    }
}


async function getService(req,res,next){
    try{
        const categoryid = req.params.categoryId
        const category = await findCategory(categoryid)
        if(!category){
            res.status(400).send({
                operation:"Failed",
                reason:"Category Not Found"
            })
        }
        // const allService = await serviceModel.find({categoryid})
        const allService = await Servicemodel.findAll({
            where:{
                categoryid:categoryid
            }
        });

        res.status(200).send({
            operation:"Success",
            allservice:allService
        })
    }catch(err){
        next(err)
    }
}

async function updateService(req,res,next){
    try{
        const {name,type} = req.body;
        const categoryid = req.params.categoryId
        const serviceid = req.params.serviceId
        if (!name || !type || !categoryid){
            res.status(400).send({
                operation:"Failed",
                note:"Required name, type and categoryId"
            })
        }
        const category = await findCategory(categoryid)
        if(!category){
            res.status(400).send({
                operation:"Failed",
                reason:"Category Not Found"
            })
        }
        // const updateService = await serviceModel.findByIdAndUpdate(serviceid,{name,type},{new:true})
        const updateService = await Servicemodel.update(
            {
            name:name,
            type:type
            },
            {
                where:{
                    id:serviceid
                },
                returning:true,
                timestamps:false
            }
        
        )
        res.status(200).send({
            operation:"Success",
        })
    }catch(err){
        next(err)
    }
}

async function deleteService(req,res,next){
    try{
        const categoryid = req.params.categoryId
        const serviceid = req.params.serviceId
        const category = await findCategory(categoryid)
        if(!category){
            res.status(400).send({
                operation:"Failed",
                reason:"Category Not Found"
            })
        }
        // const deleteService = await serviceModel.findByIdAndDelete(serviceid)
        const deleteService = await Servicemodel.destroy({
            where:{
                id:serviceid
            }
        })
        res.status(200).send({
            operation:"Success",
        })
    }catch(err){
        next(err)
    }
}

export {addCategory,getCategory,updateCategory,deleteCategory, findCategory, addService,getService,updateService,deleteService}