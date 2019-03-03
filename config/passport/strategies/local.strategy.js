let LocalStrategy = require('passport-local');
let UsersService = require('../../../db/services/').users;

exports.LocalLogin = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, async function (login, password, done) {
    try {
        let user = await UsersService.login(login, password);
        if (user) {
            done(null, user);
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e);
    }
});

exports.LocalRegister = new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    }, async function (req, login, password, done) {
        try {
            const user = await UsersService.register(req.body);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(e);
        }
    }
);
