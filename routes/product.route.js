const express=require("express")
const router=express.Router()
const upload=require("../middleware/upload")
const {createProductfromForm,getAdminProducts,editPagebyId,createProduct,getAllProducts,getProductbyId,updateProduct,deleteProduct,renderProductsPage, renderProductDetails}=require("../controllers/product.controller")
router.get("/admin/products",getAdminProducts)
router.post("/admin/products/new",upload.single("image"),createProductfromForm)
router.get("/admin/products/edit/:id",editPagebyId)
router.post("/admin/products/edit/:id",updateProduct)
router.post("/admin/products/delete/:id",deleteProduct)
router.get("/products",renderProductsPage)
router.get("/products/:id",renderProductDetails)


router.post("/products",createProduct)
router.get("/products",getAllProducts)
router.get("/products/:id",getProductbyId)



module.exports=router