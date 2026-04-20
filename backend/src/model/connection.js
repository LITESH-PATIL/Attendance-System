import mongoose from "mongoose";

import "dotenv/config";

export const connectDb = async()=>{
     try {
        if(!process.env.DATABASE_URI) {
            throw new Error("Invalid URL")
        }
        
        await mongoose.connect(process.env.DATABASE_URI);
    }
    catch(err) {
        throw err;
    }
}