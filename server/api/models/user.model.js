const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const config = require('./../../config/config')


var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        trim: true,
        minlength: 4
    },
    last_name: {
        type: String,
        require: true,
        trim: true,
        minlength: 4
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE}  is not valid email'
        }
    },
    mobile: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 6
    },
    gender: {
        type: Number,
        require: true
    },
    photo: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;

    var access = "Bearer";
    var token = jwt.sign({ _id: user._id.toHexString(), access }, config.secrets.jwt).toString();
    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {

        decoded = jwt.verify(token, config.secrets.jwt);
    } catch (error) {
        return Promise.reject();
    }
    return User.findOne({ '_id': decoded._id, 'tokens.token': token, 'tokens.access': 'Bearer' });
}

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({ email }).then((user) => {
        if (!user)
            return Promise.reject();

        return new Promise((resolve, reject) => {
            bycrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                reject();
            });
        });
    });
}

UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: { tokens: { token } }
    });
}

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bycrypt.genSalt(10, (err, salt) => {
            bycrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        })
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };