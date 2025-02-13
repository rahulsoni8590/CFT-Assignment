import { serviceModel } from "../schema/service.schema.js";
import { findCategory } from "./category.controller.js";

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
        const newService = await new serviceModel({name,type,categoryid}).save()
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
        const allService = await serviceModel.find({categoryid})
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
        const updateService = await serviceModel.findByIdAndUpdate(serviceid,{name,type},{new:true})
        res.status(200).send({
            operation:"Success",
            service:updateService
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
        const deleteService = await serviceModel.findByIdAndDelete(serviceid)
        res.status(200).send({
            operation:"Success",
        })
    }catch(err){
        next(err)
    }
}

export {addService,getService,updateService,deleteService}