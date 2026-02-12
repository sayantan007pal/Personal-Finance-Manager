import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        process.on("SIGINT", async() => {
            await mongoose.connection.close(() => {
                console.log("MongoDB connection closed through manual termination");
                process.exit(0);
            });
        });
        process.on("SIGTERM", async() => {
            await mongoose.connection.close(() => {
                console.log("MongoDB connection closed through app termination");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;