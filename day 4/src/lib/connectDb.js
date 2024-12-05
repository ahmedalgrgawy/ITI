import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};
