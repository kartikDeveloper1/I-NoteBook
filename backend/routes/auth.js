const express=require('express')
const User = require('../models/User')
const router=express.Router()
const JWT_SECRET="VerifiedBYKartik"
const jwt = require('jsonwebtoken');
//used express validator package 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fetchuser=require("../middleware/fetchuser")

//ROUTE 1: Create a User using : POST "/api/auth/CreateUser"  : No login Required
router.post('/CreateUser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({min:3}),
    body('password','Enter a valid password with atleast 5 characters').isLength({ min: 5 })
],async(req,res)=>{
    let success=false
    //if there are errors return bad Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //check user with email already exists or not
      let user=await User.findOne({email:req.body.email})
      if(user){
          return res.status(400).json({success,errors:"A user with this email already exists!!"})
      }

      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt)  //password
      
      
      //create a new user with model
      user=await User.create({
          name: req.body.name,
          email:req.body.email,
          password: secPass,
        })
      
        
      //Token creation for user
        const data={
          user:{
            id:user.id
          }
        }
        success=true
        const AuthToken = jwt.sign(data, JWT_SECRET);
        res.json({success,AuthToken})

    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
      
      // .then(user => res.json(JWTtoken))
      // .catch((err)=>{console.error(err.message)
      // res.status(500).send("some error occured")})
})

//ROUTE 2: Authenticate  a User Login using : POST "/api/auth/login"  : No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password can not be blank').exists()
],async(req,res)=>{

  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body
  try {
    let user=await User.findOne({email})
    
    if(!user){
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }

    const data={
      user:{
        id:user.id
      }
    }
    success=true
    const AuthToken = jwt.sign(data, JWT_SECRET);
    res.json({success,AuthToken})

  } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
  }
})

//ROUTE 3: Get loggedIn User Details : POST "/api/auth/getuser" : Login Required
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
      userId=req.user.id
      const user=await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }

})
module.exports=router