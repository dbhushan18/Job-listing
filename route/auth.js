const express = require("express")
const router  = express.Router();
const user = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


router.post("/register", async (req,res)=>{
    try{
        const {name, email, mobile, password} = req.body

        if(!name || !email || !mobile || !password ){
            return res.status(400).json({msg:"bad request"});
        }
        
        //check if user already exists
        const isExistingUser = await user.findOne({email:email})
        if(isExistingUser){
            return res.status(409).json({msg:"user already exists"});
        }

        isExistingUser = await user.findOne({mobile:mobile})
        if(isExistingUser){
            return res.status(409).json({msg:"user already exists"});
        }

        //secure password
        const hashedPassword = await bcrypt.hash(password , 10)
        
        const userData = new user({
            name,
            email,
            mobile,
            password: hashedPassword
        });
       
        const userResponse =  userData.save();
        const token = await jwt.sign(
            {userID: userResponse._id},
            process.env.JWT_SECRET)

        return res.status(200).json({message:"user created successfully", token: token});
        
    }
    catch(err){
        console.log("something went wrong", err)
    }
    
})

module.exports = router;