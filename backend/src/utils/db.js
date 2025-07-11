import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGO DB CONNECTED`)
    } catch (error) {
        console.log("Error connecting DB: ",error);
    }
}

export default connectDB;