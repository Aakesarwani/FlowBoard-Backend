import User from "./../models/user.js";
import CryptoJS from "crypto-js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register =async(req,res)=>{
    const {username,password}=req.body;
    try{
        req.body.password=CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        );
        const user=await User.create(req.body);
        const token =jsonwebtoken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn: "24h"}
        );
        return res.status(200).json({user,token});
    }catch(err){
        return res.status(500).json(err);
    }
}

export const login =async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username}).select('password username')
        if(!user){
            return res.status(401).json({
                errors:[
                    {
                        param:'username',
                        msg:"INVALID USERNAME OR PASSWORD"
                    }
                ]
            })
        }

        const decryptedPassword=CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)

        if(decryptedPassword !== password){
            return res.status(401).json({
                errors:[
                    {
                        param:'username',
                        msg:"INVALID USERNAME OR PASSWORD"
                    }
                ]
            })
        }
        user.password=undefined
        const token =jsonwebtoken.sign(
            {id:user._id},
            process.env.TOKEN_SECRET_KEY,
            {expiresIn: "24h"}
        );
        return res.status(201).json({user,token});
    }catch(err){
        return res.status(500).json(err);
    }
}