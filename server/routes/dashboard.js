// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Setup the Route
router.get('/weather', function (req, res) {

    var Weather = require('providers').OpenWeatherMap.Weather;

    var weather = new Weather({
        url   : 'http://api.openweathermap.org/',
        APPID : 'cc0802162cf56089d0da91b734449275',
        cache : true, // Cache API requests?
        ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
            minutes: 27,
            seconds: 45
        }
    });


    // Retrieve weather information from coordinates (Sydney, Australia)
    weather.get({'lat':45.490697, 'lon':4.450013}, function(err, response) {
        // return a json response to angular
        res.json(response);
    });
});



router.get('/forecast', function (req, res) {

    var Forecast = require('providers').OpenWeatherMap.Forecast;

    var forecast = new Forecast({
        url   : 'http://api.openweathermap.org/',
        APPID : 'cc0802162cf56089d0da91b734449275',
        cache : true, // Cache API requests?
        ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
            minutes: 27,
            seconds: 45
        }
    });


    // Retrieve weather information from coordinates (Sydney, Australia)
    forecast.get({'lat':45.490697, 'lon':4.450013}, function(err, response) {
        // return a json response to angular
        res.json(response);
    });
});

// Expose the module
module.exports = router;
