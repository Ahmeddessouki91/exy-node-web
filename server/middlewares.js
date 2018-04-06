const bodyParser = require('body-parser');
const morgan = require('morgan');

const SetGlobalMiddlewares = (app) => {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

module.exports = { SetGlobalMiddlewares };