var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var compression   = require('compression');
var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var config = require('./config.js');
global.__base = __dirname + '/';


/**
 * Route Imports
 */
var routes    = require('./routes/index');
var dashboard = require('./routes/dashboard');
var user      = require('./routes/user');
var metrics   = require('./routes/metrics');


/**
 * Cron
 */
var system = require('./system');


var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Development Settings
 */
if (app.get('env') === 'development') {
    // This will change in production since we'll be using the dist folder
    app.use(express.static(path.join(__dirname, '../client')));
    // This covers serving up the index page
    app.use(express.static(path.join(__dirname, '../client/.tmp')));

    // Error Handling
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production Settings
 */
if (app.get('env') === 'production') {
    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    //compression gzip
    app.use(compression());


    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500).json('error', {
            message: err.message,
            error: {}
        });
    });
}

/**
 * Routes
 */
app.use('/dashboard', dashboard);
app.use('/api', user);
app.use('/metrics', metrics);

// passport config
var Account = require('./models/user');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect(config.mongodb);


module.exports = app;
