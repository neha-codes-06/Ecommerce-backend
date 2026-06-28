const express=require("express")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv")
const connectToMongodB=require("./config/db")

const app=express()
dotenv.config()
connectToMongodB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const authRoutes=require("./routes/auth.routes")
app.use("/",authRoutes)

const upload=require("./middleware/upload")
app.use("/uploads",express.static("uploads"));
app.set("view engine","ejs")


// app.get("/",(req,res)=>{
//     res.render("home")
// })
app.get("/admin",(req,res)=>{
    res.render("admin")
})
app.get("/admin/products/new",(req,res)=>{
    res.render("add-product")
})

const productRoutes=require("./routes/product.route")
app.use("/",productRoutes)
const cartRoutes=require("./routes/cart.route")
app.use("/",cartRoutes)
const orderRoutes=require("./routes/order-route")
app.use("/",orderRoutes)
app.listen(8000,()=>{
    console.log("Server is running at Port 8000")

})