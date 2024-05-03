import express from "express";
import { tokenDecode,verifyToken } from "../handlers/tokenHandler.js";
import { body,param } from "express-validator";
import {update,create,deleteTask,updatePosition} from "../controllers/task.js";
import {validate,isObjectId} from "./../handlers/validation.js"

const router=express.Router();

router.post(
    '/',
    /*
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),*/
    body('sectionId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid section Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    create
);
router.put(
    '/update-position',/*
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),*/
    validate,
    verifyToken,
    updatePosition
);
router.delete(
    '/:taskId',
    /*
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),*/
    param('taskId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid task Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    deleteTask
);

router.put(
    '/:taskId',
    /*
    param('boardId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid board Id')
        }else return Promise.resolve()
    }),*/
    param('taskId').custom(value =>{
        if(!isObjectId(value)){
            return Promise.reject('invalid task Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    update
);

export default router;