var querystring = require('querystring');
var http = require('http');

module.exports = function (req, res) {

    var token = '';
    var data = querystring.stringify({
        Name: 'login user name',
        Password: 'password'
    });

    var options = {
        host: 'base url',
        method: 'POST',
        path: 'api path', // Eg: "/api/authenticate"
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = http.request(options, function (result) {

        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            var obj = JSON.parse(chunk)
            token = obj.Token;
            res.json(token);
        });
    });

    req.write(data);
    req.end();

}
