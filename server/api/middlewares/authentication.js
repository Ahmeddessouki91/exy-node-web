const config = require('./../../config/config')
const { User } = require('./../models/user.model');

const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const _ = require('lodash');

// const checkToken = expressJwt({ secret: config.secrets.jwt });

// const decodeToken = () => (req, res, next) => {
//     if (config.disableAuth) {
//         return next()
//     }
//     // make it optional to place token on query string
//     // if it is, place it on the headers where it should be
//     // so checkToken can see it. See follow the 'Bearer 034930493' format
//     // so checkToken can see it and decode it
//     if (req.query && req.query.hasOwnProperty('access_token')) {
//         req.headers.authorization = 'Bearer ' + req.query.access_token
//     }

//     // this will call next if token is valid
//     // and send error if its not. It will attached
//     // the decoded token to req.user
//     checkToken(req, res, next);
// }

const authenticate = (req, res, next) => {
    var token = req.header('Bearer');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};


module.exports = { authenticate };