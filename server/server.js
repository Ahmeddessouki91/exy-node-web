const express = require('express');
const { SetGlobalMiddlewares } = require('./middlewares')
const restRouter = require('./api/restRouter');

const app = express();

SetGlobalMiddlewares(app);

app.use('/api',restRouter)

module.exports = app;