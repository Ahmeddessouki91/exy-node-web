const { User } = require('./../../models/user.model');
const _ = require('lodash');

exports.post = (req, res, next) => {
    // var body = _.pick(req.body, ['email', 'password']);
    let body = req.body;
    let user = new User(body);
    user.save().then((res) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('Bearer', token).send(user);
    }).catch((e) => {  
        res.status(400).send(e);
    })
}