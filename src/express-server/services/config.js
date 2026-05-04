const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    DB: {
        NAME: process.env.DB_NAME || 'gym_tracker',
        USER: process.env.DB_USER || 'root',
        PASS: process.env.DB_PASS || '0000',
        HOST: process.env.DB_HOST || 'localhost',
        DIALECT: 'mysql'
    },
    GITHUB: {
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
        CALLBACK_URL: process.env.GITHUB_CALLBACK_URL
    },
    GOOGLE: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    },
    DISCORD: {
        CLIENT_ID: process.env.DISCORD_CLIENT_ID,
        CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
        CALLBACK_URL: process.env.DISCORD_CALLBACK_URL
    },
    SESSION_SECRET: process.env.SESSION_SECRET || 'my top secret key'
};