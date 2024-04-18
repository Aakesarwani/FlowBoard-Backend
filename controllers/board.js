import Board from "../models/board.js";
import Section from "../models/section.js";
import Task from "../models/task.js";

export const create =async(req,res)=>{
    try{
        const boardsCount=await Board.find().count();
        const board = await Board.create({
            user:req.user._id,
            position:boardsCount>0 ? boardsCount:0
        })
        return res.json(201).json(board);
    }catch(error){
        return res.status(500).json(error)
    }
}

export const getAll=async(req,res)=>{
    try{
        const boards = await Board.find({user:req.user._id}).sort('-position')
        res.status(200).json(boards);
    }catch(err){
        res.status(500).json(err);
    }
}

export const updatePosition=async(req,res)=>{
    const {boards}=req.body;
    try{
        for(const key in boards.reverse()){
            const board=boards[key]
            await Board.findByIdAndUpdate(
                board._id,
                {$set:{position:key}}
            )
        }
        res.status(200).json("updated")
    }catch(error){
        res.status(500).json(error);
    }
}

export const getOne =async(req,res)=>{
    const {boardId}=req.params;
    try{
        const board=await Board.findOne({user:req.user._id,_id:boardId});
        if(!board) return res.status(404).json("Board not found");
        const sections=await Section.find({board:boardId})
        for(const section of sections){
            const tasks=await Task.find({section:section.id}).populate('section').sort('-position')
            section._doc.tasks=tasks
        }
        board._doc.sections=sections
        res.status(200).json(board)
    }catch(error){
        res.status(500).json(error);
    }
}

export const update =async(req,res)=>{
    const {boardId}=req.params;
    const {title,description,favourite}=req.body
    try{
        if(title ===' ') req.body.title='Untitled';
        if(description===' ') req.body.description='Add description here!';
        const currentBoard=await Board.findById(boardId);
        if(!currentBoard) returnres.status(404).json('Board not found');

        if(favourite !== undefined && currentBoard.favourite !== favourite){
            const favourites = await Board.find({
                user:currentBoard.user,
                favourite:true,
                _id:{$ne:boardId}
            }).sort('favouritePosition')
            if(favourite){
                req.body.favouritePosition=favourites.length()>0 ? favourites.length():0;
            }else{
                for(const key in favourites){
                    const element =favourites[key]
                    await  Board.findByIdAndUpdate(
                        element._id,
                        {$set:{favouritePosition:key } }
                    )
                }
            }
        }
        const board=await Board.findByIdAndUpdate(
            boardId,
            {$set: req.body}
        )
        return res.status(200).json(board);
    }catch(error){
        return res.status(500).json(error);
    }
}

export const getFavourites=async(req,res)=>{
    try{
        const favourites = await Board.find({
            user:req.user._id,
            favourite:true
        }).sort('-favouritePosition')
        return res.status(200).json(favourites)
    }catch(error){
        return res.status(500).json(err);
    }
}

export const updateFavouritePosition= async(req,res)=>{
    const {boards}=req.body;
    try{
        for(const key in boards.reverse()){
            const board = boards[key]
            await Board.findByIdAndUpdate(
                board.id,
                { $set:{favouritePosition:key}}
            )
        }
        res.status(200).json('Updated');

    }catch(error){
        return res.status(500).json(err);
    }
}

export const deleteTask = async(req,res)=>{
    const {boardId}=req.params;
    try{
        const sections = await Section.find({board:boardId})
        for(const section of sections){
            Task.deleteMany({section:section.id})
        }
        await Section.deleteMany({board:boardId});
        const currentBoard= await Board.findById(boardId);
        if(currentBoard.favourite){
            const favourites = await Board.find({
                user:currentBoard.user,
                favourite:true,
                _id:{$ne:boardId}
            }).sort('favouritePosition');

            for(const key in favourites){
                const element =favourites[key]
                await  Board.findByIdAndUpdate(
                    element._id,
                    {$set:{favouritePosition:key } }
                )
            }
        }
        await Board.deleteOne({_id:boardId});
        const boards=await Board.find().sort('position')
        for(const key in boards){
            const board=boards[key]
            await Board.findByIdAndUpdate(
                board._id,
                {$set:{position:key}}
            )
        }
        return res.status(200).json('deleted')

    }catch(error){
        return res.status(500).json(error);
    }
}