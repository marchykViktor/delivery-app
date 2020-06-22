import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {

    port: parseInt(process.env.PORT),

    hostname: process.env.HOST || "127.0.0.1",

    db: {
      path: process.env.POSTGRES_URI
    },

    api: {
        prefix: '/api',
    }
};
