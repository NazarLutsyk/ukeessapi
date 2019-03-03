const ControllerError = require('../errors/ControllerError');

const lib = {};

lib.isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        return next(new ControllerError('Only for authenticated users', 403, 'Middleware'));
    }
};

lib.isNotAuthenticated = (req, res, next) => {
    if (!req.user) {
        return next();
    } else {
        return next(new ControllerError('Only for not authenticated users', 403, 'Middleware'));
    }
};

module.exports = lib;
