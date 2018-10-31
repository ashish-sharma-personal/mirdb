var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var fs = require('fs');
var basicAuth = require('connect-basic-auth');

var funcData = require('./function.json');
var funcFunctionData = require('./funcFunction.json');
var funcTargetData = require('./funcTarget.json');
var exprData = require('./expression.json');
var expRegulationData = require('./expRegulation.json');
var expMarkerData = require('./expMarker.json');
var expTherapyData = require('./expTherapy.json');
var expTumorSizeData = require('./expTumorSize.json');
var expSampleTypeData = require('./expSampleType.json');
var snpData = require('./snp.json');

app.use(bodyParser.json());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ "extended": false }));

function parseQuery(originalQuery) {
    // const query = {};
    // for (const key in originalQuery) {
    //     query[key] = new RegExp(originalQuery[key], 'i');
    // }
    return originalQuery; //query;
}

function sendDataAsync (database, query, res) {
        new Promise(function (resolve, reject) {
            var data = [];
            try {
                data = database.filter(function (record) {
                    var matched = true;
                    for (var key in query) {
                        if (query.hasOwnProperty(key)) {
                            if (query[key] !== record[key]) {
                                matched = false;
                                break;
                            }
                        }
                     }
                    return matched;
                });
            } catch (error) {
                reject(error);
            }
            resolve(data);
        }).then(function (data) {
            res.json(data);
        }).catch(function (error) {
            res.json({ "error": error, "message": "Error fetching data" });
        });
}

app.use(basicAuth(function (credentials, req, res, next) {
    if (credentials === undefined || credentials['username'] !== 'evaluate' || credentials['password'] !== 'evaluate') {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="MyRealmName"');
        res.end('Unauthorized');
    } else {
        res.sendfile('index.html');
    }
}, 'Please enter your credentials.'));

app.get("/", function (req, res, next) {
    req.requireAuthorization(req, res, next);
});

app.route("/function")
    .get(function (req, res) {
       var query = parseQuery(req.query), database = funcData;
        if (query.function) {
            database = funcFunctionData;
        } else if (query.target) {
            database = funcTargetData;
        }
        sendDataAsync(database, query, res);
    });

app.route("/expression")
    .get(function (req, res) {
        var query = parseQuery(req.query), database = exprData;

        if (query.marker) {
            database = expMarkerData;
        } else if (query.expression) {
            database = expRegulationData;
        } else if (query.therapy) {
            database = expTherapyData;
        } else if (query.tumor_size) {
            database = expTumorSizeData;
        } else if (query.sample_type) {
            database = expSampleTypeData;
        }
        sendDataAsync(database, query, res);
    });

app.route("/snp")
    .get(function (req, res) {
        var  query = parseQuery(req.query);
        sendDataAsync(snpData, query, res);
    });

app.listen(3000);
console.log("3000");