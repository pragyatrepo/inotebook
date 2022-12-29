var jwt=require('jsonwebtoken');
const JWT_SECRET='Pragyat is a good boy'

const fetchuser=(req,res,next)=>{
    //sending authorisation token in request header
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"authenticate using valid token"})
    }
    try{
        //verifying authorisation token
    const lul=jwt.verify(token,JWT_SECRET)
    req.user=lul.user;
    //next is function tobe executed after middleware function
    next()
    }
    catch{
        res.status(401).send({error:"authenticate using valid token"})

    }
}
module.exports=fetchuser;