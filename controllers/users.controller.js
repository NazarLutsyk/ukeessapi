let passport = require('passport');

let ControllerError = require('../errors/ControllerError');

const controller = {};

controller.login = async (req, res, next) => {
    passport.authenticate('local.login', function (e, user, info) {
        if (e) {
            return next(new ControllerError(e.message, e.status, 'Users[login]'));
        }
        if (!user) {
            return res.sendStatus(400);
        }
        req.logIn(user, function (e) {
            if (e) {
                return next(new ControllerError(e.message, e.status, 'Users[login]'));
            }
            return res.json(req.user);
        });
    })(req, res, next);
};

controller.register = async (req, res, next) => {
    passport.authenticate('local.register', function (e, user, info) {
        if (e) {
            return next(new ControllerError(e.message, e.status, 'Users[register]'));
        }
        if (!user) {
            return res.sendStatus(400);
        }
        req.logIn(user, async function (e) {
            if (e) {
                return next(new ControllerError(e.message, e.status, 'Users[register]'));
            }
            return res.json(req.user);
        });

    })(req, res, next);
};

controller.principal = async (req, res, next) => {
    res.json(req.user);
};

controller.logout = async (req, res, next) => {
    req.logout();
    res.json({msg: 'User logged out'});
};

module.exports = controller;
