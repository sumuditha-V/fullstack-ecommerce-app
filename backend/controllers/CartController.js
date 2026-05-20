import userModel from "../moddles/UserModel.js"

//add product to user cart
const addToCart = async (req,res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)
        
        // Initialize cartData if it doesn't exist
        let cartData = userData.cartData || {};

        if (Object.keys(cartData).length > 0) {
            if (cartData[itemId] && cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                if (!cartData[itemId]) {
                    cartData[itemId] = {}
                }
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Added to Cart" })
    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//update cart
const updateCart = async (req,res)=>{
    try{
        const {userId, itemId, size, quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size]= quantity;
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success:true, message:"cart updated" })

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }

}
//get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Find the user by ID
        const userData = await userModel.findById(userId);
        if (!userData) {
            console.log("!userData")
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Retrieve cart data
        const cartData = userData.cartData; // No need for 'await' since it's a property
        console.log(userData.cartData)

        // Respond with cart data
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export {addToCart, updateCart, getUserCart}