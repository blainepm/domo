// 
// var Weather = require('providers').OpenWeatherMap.Weather;
// var CronJob = require('cron').CronJob;
//
//
// var job = new CronJob('* 15 * * * *', function() {
//
//     var weather = new Weather({
//         url   : 'http://api.openweathermap.org/',
//         APPID : 'cc0802162cf56089d0da91b734449275',
//         cache : true, // Cache API requests?
//         ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
//             minutes: 27,
//             seconds: 45
//         }
//     });
//
//
//     // Retrieve weather information from coordinates (Sydney, Australia)
//     weather.get({'lat':45.490697, 'lon':4.450013}, function(err, weather) {
//         // console.dir(weather);
//     });
//
//
//     }, function () {
//     /* This function is executed when the job stops */
//     },
//     true, /* Start the job right now */
//     'Europe/Paris'  /* Time zone of this job. */
// );
