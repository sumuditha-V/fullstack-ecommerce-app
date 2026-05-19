import userModel from "../moddles/UserModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, msg: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.status(201).json({ success: true, token });
    } else {
      res.status(500).json({ success: false, message: "invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Route for user Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter a valid email" });
    }

    // Validating password strength
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Password should be at least 8 characters long",
        });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Saving the new user to the database
    const user = await newUser.save();

    // Generating a token
    const token = createToken(user._id);

    // Responding with success and the generated token
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Route for Admin Login

const adminLogin = async (req, res) => {
  try{
    const { email, password} = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({success:true,token})
    }else{
      res.json({success:false,message:"Invalid Credentials"})
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
