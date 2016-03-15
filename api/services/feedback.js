var querystring = require('querystring');
var http = require('http');

module.exports = function (req, res) {

    var token = req.query.token;

    var options = {
        host: 'host URL',
        method: 'GET',
        path: 'API Path', // Eg: "/api/authenticate"
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': token
        }
    }

    var output = '';

    var surveyRequest = http.request(options, function (feedbacks) {

        feedbacks.setEncoding('utf8');
        feedbacks.on('data', function (chunk) {
            output += chunk;
        });

        feedbacks.on('end', function () {
            var parsedOutput = JSON.parse(output);
            res.json(parsedOutput);
        });

    })

    surveyRequest.end();
}
