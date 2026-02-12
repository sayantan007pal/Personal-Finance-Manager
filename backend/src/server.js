import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";



dotenv.config();

const app = express()
const PORT = process.env.PORT || 3005;

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}))

app.get('/api/health', (req, res) =>{
    res.status(200).json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV

    });
});

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
    finally {
        console.log(`Server is running on port ${PORT} along with MongoDB`);
    }
});