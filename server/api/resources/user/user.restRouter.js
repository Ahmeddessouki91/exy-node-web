const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.route('/register')
    .post(userController.post);

module.exports = userRouter;