var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var compression   = require('compression');
var mongoose      = require('mongoose');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var logger = require("./utils/logger");

var config = require('./config.js');
global.__base = __dirname + '/';


logger.debug("app - route loading");
/**
 * Route Imports
 */
var routes    = require('./routes/index');
var dashboard = require('./routes/dashboard');
var user      = require('./routes/user');
var metrics   = require('./routes/metrics');

/*
var serialPort = require("serialport");
serialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    logger.debug(port);
  });
});*/



logger.debug("app - system loading");
/**
 * Cron
 */
var system = require('./system');

logger.debug("app - express initialisation");
var app = express();


//configuration du logger
logger.debug("Overriding 'Express' logger");
app.use(morgan("dev", {
        "stream": logger.stream,
        "skip": function (req, res) { return res.statusCode < 400 }
    }
));

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
