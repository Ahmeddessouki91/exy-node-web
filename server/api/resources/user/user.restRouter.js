const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getAll);

module.exports = userRouter;