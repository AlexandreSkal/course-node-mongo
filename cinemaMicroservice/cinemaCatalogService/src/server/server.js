require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('../config/logger');

let server = null;
async function start(api, repository) {
    const app = express();
    app.use(helmet());
    app.use(morgan('dev'));

    app.get('/health', (req, res, next) => {
        res.send(`The service ${process.env.MS_NAME} is running at ${process.env.PORT}`);
    })
    api(app, repository)
    app.use((error, req, res, next) => {
        logger.error(error.stack);
        res.sendStatus(500);
    })
    if(!server) server = app.listen(process.env.PORT, () => {
    console.log(`The service ${process.env.MS_NAME} already started at ${process.env.PORT}`);
    })
    return server;
}

async function stop() {
    if(server) await server.close();
    return server;

}

module.exports = {
    start,
    stop
}