var Client = require('request-json').JsonClient;
var queryString = require('query-string');
var crypto    = require('crypto');
var moment    = require('moment');

var cache     = {};


OpenWeatherMap = module.exports = function(options) {

		this.options = options || {
            url   : 'http://api.openweathermap.org/',
			cache:   true,
			ttl:     { minutes: 30 }
		};

        this.options.url = 'http://api.openweathermap.org/',
		this.options.ttl = moment.duration(this.options.ttl);

		this.client  = new Client(this.options.url);
	};

	OpenWeatherMap.prototype.query = function(apiParams, callback) {
		if(!this.options.APPID) {
			return callback('No APPID specified - Get one from ____________');
		}

		apiParams.APPID = this.options.APPID;
		this.client.get(this.options.urlSuffix+'?'+queryString.stringify(apiParams), callback);
    };

	OpenWeatherMap.prototype.expired = function(key) {
		if(cache[key] === undefined) return true;

		var isOld = cache[key].expires < (new Date().getTime());
		if(isOld) delete cache[key];

		return isOld;
	};

	OpenWeatherMap.prototype.getWeather = function(apiParams, ignoreCache, callback) {

        this.options.urlSuffix =  'data/2.5/weather/';

		if(typeof ignoreCache === 'function') {
			callback = ignoreCache;
			ignoreCache = false;
		}

		this.query(apiParams, function(err, res, body) {

			if(err || !body)  {
				console.log('error__________', err);
				console.log('body___________', body);
				console.log('res____________', res);
				return callback(err);
			}

			return callback(null, body);
		});
	};


    OpenWeatherMap.prototype.getForecast = function(apiParams, ignoreCache, callback) {

        this.options.urlSuffix =  'data/2.5/forecast/city/';

		if(typeof ignoreCache === 'function') {
			callback = ignoreCache;
			ignoreCache = false;
		}

		this.query(apiParams, function(err, res, body) {

			if(err || !body)  {
				return callback(err);
			}

			return callback(null, body);
		});
	};
