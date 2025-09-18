import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js"
dotenv.config({})
const app=express();

//middlweare

app.use(express.json());
app.use(urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions={
    origin:"http://localhost:5713",
    credential:true
}

app.use(cors(corsOptions));

const PORT=8000

//api
app.use("/api/v1/user",userRoute)
// https:localhost:5173/api/v1/user/register
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`);
    
})