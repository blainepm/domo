// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();


var OpenWeatherMap = require(__base + 'providers').OpenWeatherMap;

var openweathermap = new OpenWeatherMap({
    APPID : 'cc0802162cf56089d0da91b734449275',
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
        minutes: 27,
        seconds: 45
    }
});

/*openweathermap.getForecast({'lat':45.490697, 'lon':4.450013}, function(err, response) {
    // return a json response to angular
    console.log(response);
});*/



// Setup the Route
router.get('/weather', function (req, res) {
    openweathermap.getWeather({'lat':45.490697, 'lon':4.450013}, function(err, response) {
        // return a json response to angular
        res.json(response);
    });
});



router.get('/forecast', function (req, res) {

    openweathermap.getForecast({'lat':45.490697, 'lon':4.450013}, function(err, response) {
        // return a json response to angular
        res.json(response);
    });
});

// Expose the module
module.exports = router;
