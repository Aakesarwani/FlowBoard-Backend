import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect =()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        //useNewUrlParser: true,
        //useUnifiedTopology: true
    })
    .then(()=>{console.log("DB connection successful")})
    .catch((error)=>{
        console.log("Issue in db connection");
        console.error(error.message);
        process.exit(1);
    });
}
export default dbConnect;