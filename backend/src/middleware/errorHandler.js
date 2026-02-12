import { config } from "../config/environment.js";


export default function errorHandler(err, req, res, next) {
    console.error('=>', req.originalUrl, 'Error:', err.message);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Bad Request',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv
        });
    }
    if (err.name === 'ForbiddenError') {
        return res.status(403).json({
            status: 'error',
            message: 'Forbidden',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv
        });
    }
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            status: 'error',
            message: 'Not Found',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv
    });
}

