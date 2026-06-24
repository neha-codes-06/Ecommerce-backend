const Cart=require("../models/cart.model")
const addtoCart=async (req,res)=>{
    const productId=req.params.id
    const existingItem=await Cart.findOne({
        product:productId
    })
   if(existingItem){
    existingItem.quantity+=1
    await existingItem.save();

   }else{
    await Cart.create({
        product:productId,
        quantity:1,

    })
}
   res.redirect("/cart");

}

const getCart=async (req,res)=>{
    try{
        const cartItems=await Cart.find().populate("product")
        console.log(cartItems)
        res.render("cart",{cartItems})
    }
    catch(error){
        res.send(error.message)
    }



}
const removeCart=async(req,res)=>{
     try{
        const cart=await Cart.findByIdAndDelete(req.params.id);
       
        res.redirect("/cart")

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
const increaseQuantity=async (req,res)=>{
    try{
        const cartItem=await Cart.findById(req.params.id)
        carItem.quantity+=1
        console.log( "the quantity",{cartItem})
        await carItem.save()
        res.redirect("/cart")



    }
    catch(error){
        res.send(error.message)

    }

}

module.exports={
    addtoCart,
    getCart,
    removeCart,
    increaseQuantity,

}