import mongoose from "mongoose";
const Schema=mongoose.Schema
import {schemaOptions} from "./modelOptions.js";

const sectionSchema = new Schema ({
    board:{
        type:Schema.Types.ObjectId,
        ref:'Board',
        required:true
    },
    title:{
        type:String,
        default:''
    }
},schemaOptions)

const Section = mongoose.model("Section", sectionSchema);
export default Section;