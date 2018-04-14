const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const SetGlobalMiddlewares = (app) => {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

module.exports = { SetGlobalMiddlewares };