const { User } = require('./../../models/user.model');
const _ = require('lodash');

exports.getAll = (req, res, next) => {
    res.json({ ok: true });
}