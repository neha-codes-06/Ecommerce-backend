const express=require("express")
const router=express.Router()
const {renderRegisterPage,registerUser,renderLoginPage,loginUser, logoutUser}=require("../controllers/auth.controller")
router.get("/auth/register",renderRegisterPage)
router.post("/auth/register",registerUser)
router.get("/auth/login",renderLoginPage)
router.post("/auth/login",loginUser)
router.post("/auth/logout",logoutUser)

module.exports=router;
