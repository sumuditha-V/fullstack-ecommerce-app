import { v2 as cloudinary} from "cloudinary"
import productModel from "../moddles/ProductModel.js";

// Add Product function 
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;


        // Access files safely
        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images =[image1, image2, image3, image4].filter((item)=> item!== undefined) 

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        

        const productData = {
            name,
            description,
            category,
            price: Number(price), // converting string to number
            subCategory,
            bestseller: bestseller === "true" ? true : false, // converting string to boolean
            sizes: JSON.parse(sizes) ,// converting string to array
            image: imagesUrl,
            date: Date.now()
        
        }
        

        console.log(productData)

        const product = new productModel(productData);

        await product.save()

        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};





// List Product function 
const listProducts = async (req,res)=>{
    try{
        const products = await productModel.find({});
        res.status(201).json({success:true,products})
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// remove Product function 
const removeProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.body.id);
        
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// single Product info  function 
const singleProduct = async (req,res)=>{
    try{
        const {productId } = req.body
        const product = await productModel.findById(productId)
        res.status(201).json({success:true,product})
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {addProduct,listProducts,removeProduct,singleProduct}