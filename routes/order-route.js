const express=require("express")
const router=express.Router()
const isLoggedIn=require("../middleware/auth.middleware")
const {placeOrder, getMyOrders,cancelOrder,payNow}=require("../controllers/order.controller")
router.post("/place-order",isLoggedIn,placeOrder)
router.get("/orders",isLoggedIn,getMyOrders)

router.post("/cancel-order/:id",isLoggedIn,cancelOrder)
router.post("/pay-now/:id",isLoggedIn,payNow)

module.exports=router;