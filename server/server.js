const express = require('express');
const { SetGlobalMiddlewares } = require('./middlewares')
const restRouter = require('./api/restRouter');
const { protect, signIn, register } = require('./api/auth/authentication');
const userRoute = require('./api/resources/user/user.restRouter');
const app = express();
var { mongoose } = require('./db/mongoose');

SetGlobalMiddlewares(app);

app.use('/api', protect, restRouter)
app.use('/token', signIn);
app.use('/register', register);

app.get('*', (req, res) => {
    res.status(404)
        .send("Not found")
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send(error.message || error.toString())
});

module.exports = app;