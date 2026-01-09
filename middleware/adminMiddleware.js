const jwt= require('jsonwebtoken')
const adminMiddleware=(req,res,next)=>{
    console.log("inside admin middleware");
    console.log(req.headers.authorization.slice(7));
    try{
            const token =req.headers.authorization.slice(7)
            const jwtVerification=jwt.verify(token,process.env.jwtkey)
            console.log(jwtVerification);
            req.payload=jwtVerification.role
            if(jwtVerification.role=="Admin")
        {
            next();
         }
       else{
            res.status(403).json("Access denied");
        }
          
        }
        catch(err){
           res.status(402).json("Authorization Error"+err) 
        }
                   
}
module.exports=adminMiddleware