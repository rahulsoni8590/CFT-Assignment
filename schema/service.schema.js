import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    categoryid:{type:mongoose.Schema.Types.ObjectId, ref:"Category", required:true},
    name: {type:String, required:true},
    type: {type:String, required:true, enum:["Normal", "VIP"], required:true, default:"Normal"},
})


const priceOptionSchema = new mongoose.Schema({
    serviceid:{type:mongoose.Schema.Types.ObjectId, ref:"Service", required:true},
    Duration: {type:Number, required:true},
    Price: {type:Number, required:true},
    type:{type:String, enum:["Hourly", "Weekly", "Monthly"], required:true, default:"Hourly"}
})

const serviceModel = mongoose.model("Service",serviceSchema)
const priceOptionsModel = mongoose.model("PriceOptions",priceOptionSchema)

export {serviceModel,priceOptionsModel};
