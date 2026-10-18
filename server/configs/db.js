import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(
            `${process.env.MONGODB_URI}/hotel-booking`,
            { serverSelectionTimeoutMS: 10000 }
        );

        console.log("Database Connected");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
};

export default connectDB;