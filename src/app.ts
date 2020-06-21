import 'reflect-metadata';

import config from './config';

import express from 'express';

async function startServer() {
    const app = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, config.hostname, err => {
        if (err) {
            console.error(err);
            process.exit(1);
            return;
        }
        console.info(`Server run on port: ${config.port}`);
    });
}

startServer();
