// Include Express
var express = require('express');
// Initialize the Router
var router = express.Router();
var child = require('child_process');

function jsonify(inputString)
{
    // console.log(inputString);
    var outputArray = {};
    var header = '';
    var output = inputString.split('\n');
    output = output.filter(function(n){ return n != "" });

    for (var i = 0; i < output.length; i++) {
        if(output[i] != "") {

            //si header
            if(output[i].trim().indexOf('___') === -1)
            {
                header = output[i].trim();
                outputArray[header] = {};
            }
            else
            {
                var lines = output[i].trim().split('___');

                if(lines.length > 0) {
                    outputArray[header][lines[0].trim()] = lines[1].trim();
                }
            }
        }
    }

    return outputArray;
}

// Setup the Route
router.get('/metrics', function (req, res) {
    var process = child.spawn(__base + 'bin/eZServerMonitor.sh', ['--system','--load', '--cpu', '--memory', '--network'/*, '--disk'*/]);

    var shellOutput = '';

    process.stdout.on('data', function (chunk) {
      shellOutput += chunk;
    });

    process.stdout.on('end', function () {
        res.status(200).json(jsonify(shellOutput));
    });
});


// Expose the module
module.exports = router;
