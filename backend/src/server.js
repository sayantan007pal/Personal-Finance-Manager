import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import { validateConfig, config } from "./config/environment.js";



const app = express()
const PORT = config.port;

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
        environment: config.nodeEnv

    });
});

async function startServer() {
    try {
        //validate environment variables
        validateConfig();
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
