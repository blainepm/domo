var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Teleinfo = new Schema({
    'datetime' : Date,
    'OPTARIF'  : String,
    'ISOUSC'   : Number,
    'BASE'     : Number,
    'IINST'    : Number,
    'IMAX'     : Number,
    'PAPP'     : Number,
});

module.exports = mongoose.model('Teleinfo', Teleinfo);
