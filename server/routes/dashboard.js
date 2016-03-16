// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();

// Setup the Route
router.post('/', function (req, res) {

    // show the request body in the command line
    console.log(req.body);

    // return a json response to angular
    res.json({
        'msg': 'success!'
    });
});


// var Speaker = require('speaker');
// var lame = require('lame');
// var fs = require('fs');
//
// // Create the Speaker instance
// var speaker = new Speaker({
//   channels: 2,          // 2 channels
//   bitDepth: 16,         // 16-bit samples
//   sampleRate: 44100     // 44,100 Hz sample rate
// });
//
// fs.createReadStream('101.mp3')
// .pipe(new lame.Decoder())
// .on('format', function (speaker) {
//     this.pipe(new Speaker(speaker));
// });
//
//
//
// // PCM data from stdin gets piped into the speaker
// process.stdin.pipe(speaker);


// Expose the module
module.exports = router;
