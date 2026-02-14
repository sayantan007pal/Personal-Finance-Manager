import dotenv from "dotenv";
import path from "path";


dotenv.config();

export const config = {
    port: process.env.PORT || 3005,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    mongoURI: process.env.MONGO_URI,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
};

export function validateConfig() {
    const { port, mongoURI, nodeEnv, jwtSecret, jwtExpiration, jwtRefreshSecret, jwtRefreshExpiration } = config;
    if (!port) {
        throw new Error('PORT is not set');
    }
    if (!mongoURI) {
        throw new Error('MONGO_URI is not set');
    }
    if (!nodeEnv) {
        throw new Error('NODE_ENV is not set');
    }
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not set');
    }
    if (!jwtExpiration) {
        throw new Error('JWT_EXPIRATION is not set');
    }
    if (!jwtRefreshSecret) {
        throw new Error('JWT_REFRESH_SECRET is not set');
    }
    if (!jwtRefreshExpiration) {
        throw new Error('JWT_REFRESH_EXPIRATION is not set');
    }
    return true;
}



export default { config, validateConfig };