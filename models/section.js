import mongoose from "mongoose";
const Schema=mongoose.Schema
import {schemaOptions} from "./modelOptions.js";

const sectionSchema = new Schema ({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        default:'Untitled'
    }
},schemaOptions)

const Section = mongoose.model("Section", sectionSchema);
export default Section;