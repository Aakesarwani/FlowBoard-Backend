import express from "express";
import { tokenDecode,verifyToken } from "../handlers/tokenHandler.js";
import { body,param } from "express-validator";
import {deleteSection,update,create} from "../controllers/section.js";
import {validate,isObjectId} from "./../handlers/validation.js"

const router=express.Router({mergeParams:true});

router.post(
    '/',
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    create
);
router.put(
    '/:sectionId',
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),
    param('sectionId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid section Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    update
);
router.delete(
    '/:sectionId',
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),
    param('sectionId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid section Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    deleteSection
);



export default router;