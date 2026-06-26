const Cart=require("../models/cart.model")
const addtoCart=async (req,res)=>{
    const productId=req.params.id
    const existingItem=await Cart.findOne({
        user:req.user.userId,
        product:productId
    })
   if(existingItem){
    existingItem.quantity+=1
    await existingItem.save();

   }else{
    await Cart.create({
        user:req.user.userId,
        product:productId,
        quantity:1,

    })
}
   res.redirect("/cart");

}

const getCart=async (req,res)=>{
    try{
        const cartItems=await Cart.find({user:req.user.userId}).populate("product")
        let grandTotal=0;
        cartItems.forEach((item)=>{
            grandTotal+=item.product.price*item.quantity

        })
        console.log(cartItems)
        res.render("cart",{cartItems,grandTotal})
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
        cartItem.quantity+=1
        // console.log( "the quantity",{cartItem})
        await cartItem.save()
        res.redirect("/cart")



    }
    catch(error){
        res.send(error.message)

    }

}


const decreaseQuantity=async (req,res)=>{
    try{
        const cartItem=await Cart.findById(req.params.id)
        if(cartItem.quantity>1){
        cartItem.quantity-=1
        await cartItem.save()
        }
        // console.log( "the quantity",{cartItem})
        
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
    decreaseQuantity

}