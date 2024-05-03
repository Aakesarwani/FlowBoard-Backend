import express from "express";
import {register,login} from "./../controllers/user.js";
import { body } from "express-validator";
import {validate,isObjectId} from "./../handlers/validation.js"
import {verifyToken} from "./../handlers/tokenHandler.js"
import User from "../models/user.js";

const router=express.Router();

router.post(
    '/signup',
    body('username').isLength({min:8}).withMessage('username must be atleast 8 characters'),
    body('password').isLength({min:8}).withMessage('password must be atleast 8 characters'),
    body('confirmPassword').isLength({min:8}).withMessage('confirmPassword must be atleast 8 characters'),
    body('username').custom(value=>{
        return User.findOne({username:value}).then(user => {
            if(user){
                return Promise.reject('Username already taken')
            }
        })
    }),
    validate,
    register 
)

router.post(
    '/login',
    body('username').isLength({min:8}).withMessage('username must be atleast 8 characters'),
    body('password').isLength({min:8}).withMessage('password must be atleast 8 characters'),
    validate,
    login
)

router.post(
    '/verify-token',
    verifyToken,
    (req,res)=>{
        res.status(200).json({user:req.user})
    }
)
export default router;