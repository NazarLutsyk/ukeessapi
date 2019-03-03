const express = require('express');
const cors = require('cors');
let QueryParser = require('./middleware/query.parser');

require('./config/passport');
const session = require('express-session');
const passport = require('passport');


let APIRouter = require('./routes/api');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'qweerasdxsd46s548454ad2as1d',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(QueryParser);

app.use('/api', APIRouter);

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    return next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    const errToResponse = {
        message: err.message,
        status: err.status,
        controller: err.controller
    };
    res.json(errToResponse);
});

module.exports = app;
