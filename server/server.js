const express = require('express');
const { SetGlobalMiddlewares } = require('./middlewares')
const restRouter = require('./api/restRouter');
const { authenticate, signIn, register } = require('./api/middlewares/authentication');
const userRoute = require('./api/resources/user/user.restRouter');
const app = express();
var { mongoose } = require('./db/mongoose');

SetGlobalMiddlewares(app);

app.use('/api', authenticate, restRouter)
app.use('/token', signIn);
app.use('/register', register);

app.get('*', (req, res) => {
    res.status(404)
        .send("Not found")
});

module.exports = app;