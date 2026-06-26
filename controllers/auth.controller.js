const User=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const renderRegisterPage=async(req,res)=>{
    res.render("register")

}

const registerUser=async (req,res)=>{
    try{
        const existingUser=await User.findOne({
            email:req.body.email,
        })
        if(existingUser){
            return res.send("Email already registered")
        }
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
    })
    res.redirect("/auth/login")
}

    catch(error){
        res.send(error.message)
    }
}
const renderLoginPage=async (req,res)=>{
    res.render("login")
}

const loginUser=async (req,res)=>{
    try{
        const {password}=req.body
        const user=await User.findOne({
            email:req.body.email
        })
        if(!user){
            return res.send("User not found")
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.send("invalid Password")
        }
        const token=jwt.sign(
            {
                userId:user._id
            },
            "mysecretkey"
        );
        console.log(token)
        res.cookie("token",token)

     
        res.redirect("/products")



    }
    catch(error){
        res.send(error.message)
    }

}

const logoutUser=async (req,res)=>{
    res.clearCookie("token")
    res.redirect("/auth/login")

}
module.exports={renderRegisterPage,registerUser,renderLoginPage,loginUser, logoutUser}