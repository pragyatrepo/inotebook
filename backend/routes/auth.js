const express=require('express');
const router=express.Router();
const User=require('../models/User');
const{body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs')
const fetchuser=require('../middleware/fetchuser')
var jwt=require('jsonwebtoken')
const JWT_SECRET='Pragyat is a good boy'

//definng api path and doing validation route1
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],async(req,res)=>{
    try{
    //if there are errors return error
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //check whether user with this email already exists
    let user=await User.findOne({email:req.body.email})
    if (user){
        return res.status(400).json({error:"Sorry a user withis mail already exists"})
    }
    //creating salt and hash
    const salt=await bcrypt.genSalt(10);
    const secpass= await bcrypt.hash(req.body.password,salt);
    //creating user
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpass
    });
    const data={
        user:{
            id:user.id
        }
    }
    const jwtdata=jwt.sign(data,JWT_SECRET)
    //logging the response
    res.json(jwtdata)
}
catch(error){
    res.status(500).send("some error occured")
    console.log(error.message)
}
});


//login user credentials route2
router.post('/login',[
    body('email','Enter a valid mail').isEmail(),
    body('password','password cannot be blank').exists(),
],async(req,res)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const{email,password}=req.body;
    try{
    let user=await User.findOne({email});
    if(!user){
        res.status(400).json({error:"Enter valid credentials"});
    }
    //comparing password entered to p[assword saved]
    const passwordcompare=await bcrypt.compare(password,user.password)
    if(!passwordcompare){
        res.status(400).json({error:"Enter valid credentials"});

    }
    const data={
        user:{
            id:user.id
        }
    }
    const jwtdata=jwt.sign(data,JWT_SECRET);
    res.json({"authtoken":jwtdata})
}
catch(error){
    res.status(500).send("some error occured")
    console.log(error.message)
}
})
//route3 getting logedin user detail
router.post('/getuser', fetchuser ,async(req,res)=>{
    
try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    res.status(500).send("some error occured")
    console.log(error.message)
}})
module.exports=router