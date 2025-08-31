import userModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req,res) => {

}

const registerUser = async (req,res) => {

    try {
        const {name, email, password} = req.body;

        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({
                success: false,
                message: "User already exist",
            })
        }
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "Invalid Email",
            })
        }
        if(password.length < 6){
            return res.json({
                success: false,
                message: "Password must be at least 6 characters",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({name, email, password: hashPassword});

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        })
    }

}

const adminLogin = async (req,res) => {

}

export {loginUser, registerUser, adminLogin};