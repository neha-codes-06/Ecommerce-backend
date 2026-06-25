const express=require("express")
const router=express.Router()
const {addtoCart,getCart,removeCart,increaseQuantity,decreaseQuantity}=require("../controllers/cart.controller")
router.get("/cart",getCart)
router.post("/cart/add/:id",addtoCart)
router.post("/cart/remove/:id",removeCart)
router.post("/cart/increase/:id",increaseQuantity)
router.post("/cart/decrease/:id",decreaseQuantity)

module.exports=router