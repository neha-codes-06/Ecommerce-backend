const Order=require("../models/order.model")
const Cart=require("../models/cart.model")

const placeOrder=async (req,res)=>{
    const cartItems=await Cart.find({
        user:req.user.userId
    }).populate("product")

    if(cartItems.length===0){
        return res.send("Cart is empty")
    }
    let totalAmount=0;
    for(const item of cartItems){
        totalAmount+=item.product.price*item.quantity
    }

    const order=await Order.create({
        user:req.user.userId,
        items:cartItems.map(item=>({
            product:item.product._id,
            quantity:item.quantity,
            
    })),
    totalAmount
    });
    await Cart.deleteMany({
        user:req.user.userId
    })
    res.redirect("/orders")

}

const getMyOrders=async (req,res)=>{
    const orders=await Order.find({user:req.user.userId,

    }).populate("items.product")
    res.render("order",{orders})

}

const cancelOrder=async (req,res)=>{
    const orderId=req.params.id
    await Order.findByIdAndUpdate(orderId,{status:"Cancelled"})
    res.redirect("/orders")
}

const payNow=async (req,res)=>{
    const orderId=req.params.id
    const order=await Order.findById(orderId)
    if(!order){
        return res.send("Order not found")
    }

    if(order.status !=="Pending"){
        return res.send("Order already processed");
    }
    order.status="Paid";
    await order.save()
    res.redirect("/orders")
};




module.exports={
    placeOrder,
    getMyOrders,
    cancelOrder,
    payNow,

}