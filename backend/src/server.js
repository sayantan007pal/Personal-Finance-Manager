import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import { validateConfig, config } from "./config/environment.js";
import { errorHandler } from "./middleware/index.js";
import { authRoutes , accountRoutes, transactionRoutes } from "./routes/index.js";


const app = express()
const PORT = config.port;

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
    optionsSuccessStatus: 200
}))

// health check endpoint
app.get('/api/health', (req, res) =>{
    res.status(200).json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv

    });
});
//API routes
app.use('/api/users',authRoutes);
app.use('/api/accounts',accountRoutes);
app.use('/api/transactions',transactionRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/budgets', budgetRoutes);
// app.use('/api/reports', reportRoutes);

app.use((req, res, next) => {
    console.log('=>', req.originalUrl, 'Route not found');
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv
    });
});
// error handler
app.use(errorHandler);

// start server function
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
