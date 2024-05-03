import express from "express";
import { body,param } from "express-validator";
import {validate,isObjectId} from "./../handlers/validation.js"
import {verifyToken,tokenDecode} from "./../handlers/tokenHandler.js"
import { create, getAll , updatePosition,getOne ,update, getFavourites, updateFavouritePosition, deleteBoard} from "../controllers/board.js";

const router=express.Router();

router.post('/',
    verifyToken,
    create
);
router.get('/',
    verifyToken,
    getAll
);
router.put('/',
    verifyToken,
    updatePosition
);
router.get('/favourites',
    verifyToken,
    getFavourites
)
router.put('/favourites',
    verifyToken,
    updateFavouritePosition
)
router.get(
    '/:boardId',
    param('boardId').custom(value=>{
        if(!isObjectId(value)){
            return Promise.reject('Invalid Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    getOne
);
router.put(
    '/:boardId',
    param('boardId').custom(value=>{
        if(!isObjectId(value)){
            return Promise.reject('Invalid Id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    update
);

router.delete(
    '/:boardId',
    param('boardId').custom(value=>{
        if(!isObjectId(value)){
            return Promise.reject('Invalid id')
        }else return Promise.resolve()
    }),
    validate,
    verifyToken,
    deleteBoard
)



export default router;