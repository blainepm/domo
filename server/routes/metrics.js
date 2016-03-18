// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var child = require('child_process');


// Setup the Route
router.get('/metrics', function (req, res) {
    var process = child.spawn(__base + 'bin/eZServerMonitor.sh --system');
    var shellOutput = '';

    process.stdout.on('data', function (chunk) {
      shellOutput += chunk;
    });

    process.stdout.on('end', function () {
        res.status(200).json(shellParser(shellOutput));
    });
});


// Expose the module
module.exports = router;
