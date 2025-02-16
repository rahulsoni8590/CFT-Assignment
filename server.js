import 'dotenv/config'
import express from "express"
import jwt from "jsonwebtoken";
import verifyJWTToken from './middleware/jwt.js';
import sequelize from './config/sql.config.js';
import { connectDB } from './config/sql.config.js';
import { addCategory,updateCategory,getCategory,deleteCategory,addService,getService,updateService,deleteService } from './controller/mysql.controller.js';

// import db from "./config/db.config.js"
// import { addCategory,updateCategory,getCategory,deleteCategory } from './controller/category.controller.js';
// import { addService,updateService,getService,deleteService } from './controller/service.controller.js';

const app = express()

sequelize.sync({ alter:true }).then(() => {
  console.log("Database & tables are ready!");
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const user = {email: "admin@codesfortomorrow.com",password: "Admin123!@#"}

//login
app.post("/login", (req,res,next)=>{
    const {email,password} = req.body;
    if (email === user.email && password === user.password){
        const token = jwt.sign({user:email},process.env.SECRETKEY, {expiresIn:'24h'})
        res.status(200).send({
            login:"Success",
            token
        })
    }else{
        res.status(400).send("Login Failed")
    }
})

// category
app.post('/category', (req,res,next)=>{
    addCategory(req,res,next)
})

app.get('/categories', (req,res,next)=>{
    getCategory(req,res,next)
})

app.put('/category/:categoryId', (req,res,next)=>{
    updateCategory(req,res,next)
})

app.delete('/category/:categoryId', (req,res,next)=>{
    deleteCategory(req,res,next)
})
 
//service
app.post('/category/:categoryId/service', (req,res,next)=>{
    addService(req,res,next)
})

app.get('/category/:categoryId/services', (req,res,next)=>{
    getService(req,res,next)
})

app.put('/category/:categoryId/service/:serviceId', (req,res,next)=>{
    updateService(req,res,next)
})

app.delete('/category/:categoryId/service/:serviceId', (req,res,next)=>{
    deleteService(req,res,next)
})

app.use((err,req,res,next)=>{
    res.status(400).send("Something went wrong. Please try again later")
})

const port = 5500

app.listen(port, ()=>{
    // db()
    connectDB()
    console.log("app listening on port 5500")
})