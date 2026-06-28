const Product=require("../models/product.model")

const home=async (req,res)=>{
    const products=await Product.find()
    res.render("home",{products})
}
const createProductfromForm=async(req,res)=>{
    try{
        const product=await Product.create({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            image:req.file.filename,
            category:req.body.category,
        });
        res.redirect("/products")
    }catch(error){
        res.send(error.message)
    }
        

}
const getAdminProducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.render("admin-products",{products})


    }
    catch(error){
        res.status(500).json({
            
            message:error.message
        })
    }

}
const createProduct=async(req,res)=>{
    try{
        const product=await Product.create(req.body);
        res.status(201).json({
            success:true,
            data:product

        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getAllProducts=async(req,res)=>{
     try{
        const products=await Product.find();
        res.status(200).json({
            success:true,
            products

        })

    }
    catch(error){
        res.status(500).json({
            
            message:error.message
        })
    }

}

const getProductbyId=async(req,res)=>{
     try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        res.status(200).json({
            success:true,
            products

        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

const editPagebyId=async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id)
        res.render("admin-edit",{product})
    }
    catch(error){
         res.send(error.message)

    }
}
const updateProduct=async(req,res)=>{
     try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        
        res.redirect("/admin/products")

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

const deleteProduct=async(req,res)=>{
     try{
        const product=await Product.findByIdAndDelete(req.params.id);
       
        res.redirect("/admin/products")

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

const renderProductsPage=async(req,res)=>{
     try{
        const search=req.query.search || "";
        const category=req.query.category||"";
        const sort=req.query.sort||"";

        const page=Number(req.query.page)||1;
        const limit=4;
        const skip=(page-1)*limit
        const query={};
        if(search){
            query.name={
                $regex:search,
                $options:"i",
                };

            }
        if(category){
                query.category=category }

        let sortOption={}        
        if(sort==="low"){
            sortOption.price=1
        }
        if(sort==="high"){
             sortOption.price=-1

        }
        const totalProducts=await Product.countDocuments(query)
        const totalPages=Math.ceil(totalProducts/limit)

        const products=await Product.find(query).sort(sortOption).skip(skip).limit(limit)
        
        res.render("products",{products,search,category,page,totalPages,sort})
       
    }
    catch(error){
        res.status(500).json({
            
            message:error.message
        })
    }

}
const renderProductDetails=async(req,res)=>{
     try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.send("Product not found")
        }
        res.render("product-details",{product})
       
    }
    catch(error){
        res.status(500).json({
            
            message:error.message
        })
    }

}

module.exports={
     home,
    createProductfromForm,
    getAdminProducts,
    editPagebyId,
    createProduct,
    getAllProducts,
    getProductbyId,
    updateProduct,
    deleteProduct,
    renderProductsPage,
    renderProductDetails

    

    
}
