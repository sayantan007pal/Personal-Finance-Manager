import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";



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

async function startServer() {
    try {
        //database connection
        await connectDB();
        //start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

startServer();
