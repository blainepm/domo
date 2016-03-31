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


router.get('/edf', function(req, res){
    /*function getDatasPuissance ($nb_days) {
    global $sqlite;
    $months    = array('01' => 'janv', '02' => 'fev', '03' => 'mars', '04' => 'avril', '05' => 'mai', '06' => 'juin', '07' => 'juil', '08' => 'aout', '09' => 'sept', '10' => 'oct', '11' => 'nov', '12' => 'dec');
    $now  = time();
    $past = strtotime("-$nb_days day", $now);

    $db = new SQLite3($sqlite);
    $results = $db->query("SELECT * FROM puissance WHERE timestamp > $past ORDER BY timestamp ASC;");

    $sums = array();
    $days = array();
    $datas = array();

    while($row = $results->fetchArray(SQLITE3_ASSOC)){
      $year   = date("Y", $row['timestamp']);
      $month  = date("n", $row['timestamp']-1);
      $day    = date("j", $row['timestamp']);
      $hour   = date("G", $row['timestamp']);
      $minute = date("i", $row['timestamp']);
      $second = date("s", $row['timestamp']);
      $datas[] = "[{v:new Date($year, $month, $day, $hour, $minute, $second), f:'".date("j", $row['timestamp'])." ".$months[date("m", $row['timestamp'])]." ".date("H\hi", $row['timestamp'])."'}, {v:".$row['va'].", f:'".$row['va']." V.A'}, {v:".$row['watt'].", f:'".$row['watt']." kW'}]";

    }

    return implode(', ', $datas);
  }*/


});


// Expose the module
module.exports = router;
