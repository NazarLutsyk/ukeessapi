let passport = require('passport');
let LocalStrategy = require('./strategies/local.strategy');
let UsersService = require('../../db/services/users.service');

passport.serializeUser(function (user, done) {
    done(null, user.uId);
});
passport.deserializeUser(async function (id, done) {
    try {
        let user = await UsersService.findById(id);
        return done(null, user);
    } catch (e) {
        return done(e);
    }
});

passport.use('local.login', LocalStrategy.LocalLogin);
passport.use('local.register', LocalStrategy.LocalRegister);
