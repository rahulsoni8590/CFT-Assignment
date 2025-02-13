import mongoose from "mongoose";

 async function db(){
    try{
        await mongoose.connect(process.env.DB_HOST + process.env.DB_NAME);
        console.log("Db connected, databaseName is cft")
    }catch(err){
        console.log("Failed to connect Db")
    }
}

export default db;