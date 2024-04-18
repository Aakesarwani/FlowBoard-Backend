import mongoose from "mongoose";
import {schemaOptions} from "./modelOptions.js"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},schemaOptions);

const User = mongoose.model("User", userSchema);
export default User;