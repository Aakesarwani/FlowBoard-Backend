import express from "express";
import path from "path";
import cookieParser from "cookie-parser"
//import { logger } from "morgan"
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/database.js";
import allrouter from "./routes/router.js"

const app=express();
dotenv.config();
const port=process.env.PORT;

app.use(cors());
//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1",allrouter)

app.listen(port,()=>{
    console.log(`App running Successfully on port ${port}`);
})
dbConnect();
