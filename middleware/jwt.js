import jwt from "jsonwebtoken";

function verifyJWTToken(req,res,next){
    try{
        const token = req.header("Authorization").split("Bearer ")[1];
        if (!token){
            res.status(400).send("Token not found")
        }else{
            const payload = jwt.verify(token,process.env.SECRETKEY)
            req.email = payload.user
            console.log(payload)
            next()
        }
    }catch(err){
        next(err)
    }
}

export default verifyJWTToken;