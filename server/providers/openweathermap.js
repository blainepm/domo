var Client = require('request-json').JsonClient;
var queryString = require('query-string');
var crypto    = require('crypto');
var moment    = require('moment');

OpenWeatherMap = module.exports;


OpenWeatherMap.Weather = (function() {
	function Weather(options) {
		this.cache     = {};

		this.options = options || {
			cache:   true,
			ttl:     { minutes: 30 }
		};

		this.options.urlSuffix =  'data/2.5/weather/';
		this.options.ttl = moment.duration(this.options.ttl);

		this.client  = new Client(this.options.url);
	}

	Weather.prototype.query = function(apiParams, callback) {
		if(!this.options.APPID) {
			return callback('No APPID specified - Get one from ____________');
		}

		apiParams.APPID = this.options.APPID;

		this.client.get(this.options.urlSuffix+'?'+queryString.stringify(apiParams), callback);
    };

	Weather.prototype.expired = function(key) {

		if(this.cache[key] === undefined) return true;

		var isOld = this.cache[key].expires < (new Date().getTime());
		if(isOld) delete this.cache[key];

		return isOld;
	};

	Weather.prototype.get = function(apiParams, ignoreCache, callback) {
		var self = this;
		var key  = crypto.createHash('md5')
		    .update(this.options + apiParams)
		    .digest('hex');

		if(typeof ignoreCache === 'function') {
			callback = ignoreCache;
			ignoreCache = false;
		}

		if(typeof ignoreCache !== 'boolean') ignoreCache = false;


		console.log(this.options.urlSuffix+'?'+queryString.stringify(apiParams));

	console.log(ignoreCache, this.options.cache, this.cache[key] != undefined, this.expired(key));


		if(!ignoreCache && this.options.cache && this.cache[key] != undefined && !this.expired(key)) {
			console.log('cached!__________________');
			return callback(null, this.cache[key]);
		}


		console.log(this.options.urlSuffix+'?'+queryString.stringify(apiParams));

		this.query(apiParams, function(err, res, body) {



			if(err || !body)  {
				return callback(err);
			}

			if(body !== '' && self.options.cache) {
				self.cache[key] = body;
				self.cache[key].expires = new Date().getTime() + self.options.ttl.asMilliseconds();
			}


			return callback(null, body);
		});
	};

	return Weather;
})();


OpenWeatherMap.Forecast = (function() {
	function Forecast(options) {
		this.cache     = {};

		this.options = options || {
			cache:   true,
    		ttl:     { minutes: 30 }
		};

		this.options.urlSuffix = 'data/2.5/forecast/city/';
		this.options.ttl = moment.duration(this.options.ttl);

	    this.client  = new Client(this.options.url);
	}

	Forecast.prototype.query = function(apiParams, callback) {
		if(!this.options.APPID) {
			return callback('No APPID specified - Get one from ____________');
		}

		apiParams.APPID = this.options.APPID;

		this.client.get(this.options.urlSuffix+'?'+queryString.stringify(apiParams), callback);
    };

	Forecast.prototype.expired = function(key) {

		if(this.cache[key] === undefined) return true;

		var isOld = this.cache[key].expires < (new Date().getTime());
		if(isOld) delete this.cache[key];

		return isOld;
	};

	Forecast.prototype.get = function(apiParams, ignoreCache, callback) {
		var self = this;
		var key  = crypto.createHash('md5')
		    .update(this.options + apiParams)
		    .digest('hex');

		if(typeof ignoreCache === 'function') {
			callback = ignoreCache;
			ignoreCache = false;
		}

		if(typeof ignoreCache !== 'boolean') ignoreCache = false;

	// console.log(ignoreCache, this.options.cache, this.cache[key] != undefined, this.expired(key));


		if(!ignoreCache && this.options.cache && this.cache[key] != undefined && !this.expired(key)) {
			console.log('cached!');
			return callback(null, this.cache[key]);
		}

		this.query(apiParams, function(err, res, body) {

			if(err || !body)  {
				return callback(err);
			}

			if(body !== undefined && self.options.cache) {
				self.cache[key] = body;
				self.cache[key].expires = new Date().getTime() + self.options.ttl.asMilliseconds();
			}

			return callback(null, body);
		});
	};

	return Forecast;
})();
