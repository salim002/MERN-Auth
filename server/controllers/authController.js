import authModel from '../models/authModel.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class authController
{
    static userRegistration = async (req, res)=>{
        const {name, email, password} = req.body;
        try{
            if(name && email && password){
                const isUser = await authModel.findOne({email: email});
                if(isUser){
                    return res.status(400).json({"message": "User already exists"});
                }
                else{
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);
    
                    const newUser = authModel({
                        name: name, 
                        email: email, 
                        password: hashedPassword
                    });
                    const resUser = await newUser.save();
                    if(resUser){
                        return res.status(200).json({"message": "Registered successfully", user: resUser});
                    }
                    else{
                        return res.status(400).json({"message": "Some error occured while registering"});
                    }
                }
            }
            else{
                return res.status(400).json({"message": "All fields are required"});
            }
        } catch(error){
            return res.status(400).json({"message": error});
        }
    }

    static userLogin = async (req, res)=>{
        const {email, password} = req.body;
        try{
            if(email && password){
                const isUser = await authModel.findOne({email: email});
                if(isUser){
                    if(await bcryptjs.compare(password, isUser.password)){
                        // return res.status(200).json(isUser);
                        const token = jwt.sign({userId: isUser._id}, "pleaseSubscribe", {expiresIn: "2d"});
                        return res.status(200).json({message: "Logged In Successfully", token});
                    }
                    else{
                        return res.status(400).json({message: "wrong email or password"});
                    }
                }
                else{
                    return res.status(404).json({message: "user not found"});
                }
            }
            else{
                return res.status(400).json({message: "all fields are required"});
            }
        }catch(error){
            return res.status(400).json({message: error.message});
        }
    }

    static changePassword = async (req, res)=>{
        const {newPassword, confirmPassword} = req.body;
        try{
            if(newPassword && confirmPassword){
                if(newPassword===confirmPassword){
                    const gensalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(newPassword, gensalt);
                    await authModel.findByIdAndUpdate(req.user._id, {password: hashedPassword,});
                    return res.status(200).json({message: "password changed successfully"});
                }
                else{
                    return res.status(400).json({message: "newPassword and confirmPassword does not match"});
                }
            }
            else{
                return res.status(400).json({message: "all fields are required"});
            }
        } catch(error){
            return res.status(400).json({message: error.message});
        }
    }
}

export default authController;