import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

//Register User:/api/user/register


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        if(!name||!email||!password){
            return res.json({success:false,message:"Please fill all the fields"})}

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })}

        // Create new user
        const hashedPassword =await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // Send response    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        }); 

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({success:true,user:{email:user.email,name:user.name}})


        } catch (error) {
            console.log(error.message);
            res.json({success:false,message:error.message})

            
        }  


}

//LoginFunction:/api/user/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
        });

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};


    //check Auth:/api/user/is-auth


export const isAuth = async (req, res) => {

    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        return res.json({success:true,user})

    }
    catch(error){ console.log(error.message);
            res.json({success:false,message:error.message})}}
//Logout User:/api/user/logout

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
        });
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

