var request = require('request');

module.exports = function (req, res) {

    var url = 'OAuth token URL';

    var params = {
        client_id: 'XXX',
        grant_type: 'XXX',
        client_secret: 'XXX',
        username: 'test@gmail.com',
        password: 'password'
    };

    request.post(url, {
        json: true,
        form: params
    }, function (error, response, token) {

        var accessToken = token.access_token;

        console.log("Token: " + accessToken);
        console.log("Sub Domain: " + token.subdomain);
               
    });
}
