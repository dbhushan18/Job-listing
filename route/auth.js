const express = require("express")
const router  = express.Router();
const user = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


router.post("/register", async (req,res)=>{
    try{
        const {name, email, mobile, password} = req.body

        if(!name || !email || !mobile || !password ){
            return res.status(400).json({message:"bad request"});
        }
        
        //check if user already exists
        let isExistingUser = await user.findOne({email:email})
        if(isExistingUser){
            return res.status(409).json({message:"user already exists"});
        }

        isExistingUser = await user.findOne({mobile:mobile})
        if(isExistingUser){
            return res.status(409).json({message:"user already exists"});
        }

        //secure password
        const hashedPassword = await bcrypt.hash(password , 10)
        
        const userData = new user({
            name,
            email,
            mobile,
            password: hashedPassword
        });
       
        const userResponse = await userData.save();
        const token = await jwt.sign(
            {userID: userResponse._id},
            process.env.JWT_SECRET)

        return res.status(200).json(
            {message:"user created successfully", token: token, name: name});
        
    }
    catch(err){
        console.log("something went wrong", err)
    }
    
});

router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "bad request or invalid credentials"})
        }

        const userDetails = await user.findOne({email})
        if(!userDetails){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const passwordMatch = await bcrypt.compare(
            password, 
            userDetails.password
        );

        if(!passwordMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = await jwt.sign(
            {userID: userDetails._id},
            process.env.JWT_SECRET)

        return res.status(200).json(
            {message:"user logged in successfully", token: token, name: userDetails.name});
    }
    catch(err){
        // res.status(400).json({message: "something went wrong"},err);
        console.log(err);
    }
})

module.exports = router;