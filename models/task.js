import mongoose from "mongoose";
const Schema =mongoose.Schema
import {schemaOptions} from "./modelOptions.js"

const taskSchema = new Schema({
    section:{
        type:Schema.Types.ObjectId,
        ref:'Section',
        required:true
    },
    title:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    },
    position:{
        type:Number
    }
},schemaOptions)

const Task = mongoose.model("Task", taskSchema);
export default Task;