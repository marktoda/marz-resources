import express from 'express';
import morgan from 'morgan';
import { errorMiddleware } from './errors';
import { getTokenMetadata } from './tokens';
import { getConfig } from './config';

async function main() {
    const config = getConfig();
    console.log(`Starting server with ${config.env} config`);

    const app = express()
    app.use(errorMiddleware);
    app.use(morgan('combined'))

    app.get('/token/:id', getTokenMetadata);

    console.log(`running server on ${config.port}`);
    app.listen(config.port);
}


main();

