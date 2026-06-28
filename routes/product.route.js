const express=require("express")
const router=express.Router()
const isLoggedIn=require("../middleware/auth.middleware")
const upload=require("../middleware/upload")
const {home,createProductfromForm,getAdminProducts,editPagebyId,createProduct,getAllProducts,getProductbyId,updateProduct,deleteProduct,renderProductsPage, renderProductDetails}=require("../controllers/product.controller")
router.get("/",home)
router.get("/admin/products",getAdminProducts)
router.post("/admin/products/new",upload.single("image"),createProductfromForm)
router.get("/admin/products/edit/:id",editPagebyId)
router.post("/admin/products/edit/:id",updateProduct)
router.post("/admin/products/delete/:id",deleteProduct)
router.get("/products",isLoggedIn,renderProductsPage)
router.get("/products/:id",renderProductDetails)


router.post("/products",createProduct)
router.get("/products",getAllProducts)
router.get("/products/:id",getProductbyId)



module.exports=router