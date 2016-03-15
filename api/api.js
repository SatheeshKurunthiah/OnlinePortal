var express = require('express');
var bodyParser = require('body-parser');
var Feedback = require('./services/feedback.js');
var License = require('./services/license.js');
var AuthenticateSurvey = require('./services/surveyauthentication.js');
var shareFileAuth = require('./services/shareFileAuth.js');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/feedback', Feedback);

app.get('/authenticatesurvey', AuthenticateSurvey);

app.get('/license', License);

app.post('/auth/shareFile', shareFileAuth);

var server = app.listen(3000, function () {
    console.log("Listening on port :", server.address().port);
})
