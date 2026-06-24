const express=require("express")
const router=express.Router()
const {addtoCart,getCart,removeCart,increaseQuantity}=require("../controllers/cart.controller")
router.get("/cart",getCart)
router.post("/cart/add/:id",addtoCart)
router.post("/cart/remove/:id",removeCart)
router.post("cart/increase/:id",increaseQuantity)

module.exports=router