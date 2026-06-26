const express=require("express")
const router=express.Router()
const isLoggedIn=require("../middleware/auth.middleware")
const {addtoCart,getCart,removeCart,increaseQuantity,decreaseQuantity}=require("../controllers/cart.controller")
router.get("/cart",isLoggedIn,getCart)
router.post("/cart/add/:id",isLoggedIn,addtoCart)
router.post("/cart/remove/:id",isLoggedIn,removeCart)
router.post("/cart/increase/:id",isLoggedIn,increaseQuantity)
router.post("/cart/decrease/:id",isLoggedIn,decreaseQuantity)

module.exports=router