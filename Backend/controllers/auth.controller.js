import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET, {
        expiresIn : "24h"
    })
}


export const register = async (req, res) => {
    try{

        const {userName  , Email , Password} = req.body;

        
        if(Email === undefined || Password === undefined || userName === undefined){
            return res.status(400).json({
                message : "Please fill all the fields"
            });
        }
        
        if(Password.length <= 6){
            return res.status(400).json({
                message : "Password should be atleast 6 characters long"
            })
        }
        
        if(!Email.includes("@") || !Email.includes(".")){
            return res.status(400).json({
                message : "Invalid Email"
            })
        }
        
        if(userName > 30){
            return res.status(400).json({
                message : "Username should be less than 30 characters"
            })
        }
        
        const user = await User.findOne({Email , userName});
        
        if(user){
            
            return res.status(409).json({
                
                message : "User or Email already exists"
            })
        }
        
        //hashing the password
        
        const hashPassword = await bcrypt.hash(Password,10);
            
        const userData = await User.create({
            username :userName,
            email : Email,
            password : hashPassword,
            
            
        });
        
        if(!userData){
            return res.status(400).json({
                message : "User not created"
            })
        }
        
        const token = userData.generateToken(userData._id);
        userData.token = token;
        await userData.save();
        
        
        return res.status(200).json({
            status: 200,
            message : "User Registered Successfully"
        })
        
    }
    catch(error){
        return res.status(500).json({
            message : error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        
        const {userName, Password} = req.body;

        if(userName === undefined || Password === undefined){
            return res.status(400).json({
                message : "Please fill all the fields"
            });
        }
        const user = await User.findOne({username : userName});

        if(!user){
            return res.status(404).json({
                message : "Invalid Username"
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(Password,user.Password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message : "Invalid Password"
            })
        }
        const token = await user.generateToken();

        user.token = token;

        await user.save();

        return res.status(200).json({
            status : 200,
            message : "User Logged In Successfully",
            userData : {
                _id : user._id,

                userName : user.username,
                Email : user.email,

                token : user.token,

            }

        })

        
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        const user = req.user;

        const findUser = await User.findById(user._id);
        findUser.token = "";
        await findUser.save();

        return res.status(200).json({
            message : "User Logged Out Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}