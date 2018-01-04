var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var fs = require('fs');
var basicAuth = require('connect-basic-auth');

var functionModel = require("./model/function");
var expressionModel = require("./model/expression");
var expRegulationModel = require("./model/expRegulation");
var expMarkerModel = require("./model/expMarker");
var expTherapyModel = require("./model/expTherapy");
var expTumorSizeModel = require("./model/expTumorSize");
var snpModel = require("./model/snp");

/*
var funcData = require('./function.json');
var exprData = require('./expression.json');
var expRegulationData = require('./expRegulation.json');
var expMarkerData = require('./expMarker.json');
var expTherapyData = require('./expTherapy.json');
var expTumorSizeData = require('./expTumorSize.json');
var snpData = require('./snp.json');

function saveJSONToDB(json, model) {
    for (var i = 0; i < json.length; i++) {
        var db = new model();
        Object.assign(db, json[i]);
        db.save(function (err) {
            if (err) {
                console.log('error');
            }
        });
    }
}
saveJSONToDB(exprData, expressionModel);
saveJSONToDB(expRegulationData, expRegulationModel);
saveJSONToDB(expMarkerData, expMarkerModel);
saveJSONToDB(expTherapyData, expRegulationModel);
saveJSONToDB(expTumorSizeData, expTumorSizeModel);

saveJSONToDB(funcData, functionModel);
saveJSONToDB(snpData, snpModel);
*/

app.use(bodyParser.json());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ "extended": false }));

function parseQuery(originalQuery) {
    const query = {};
    for (const key in originalQuery) {
        query[key] = new RegExp(originalQuery[key], 'i');
    }
    return originalQuery; //query;
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
        var response = {};
        functionModel.find(parseQuery(req.query), function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(data);
        });
    });

app.route("/expression")
    .get(function (req, res) {
        var response = {},
            query = parseQuery(req.query),
            model = expressionModel;

        if (query.marker) {
            model = expMarkerModel;
        } else if (query.expression) {
            model = expRegulationModel;
        } else if (query.therapy) {
            model = expTherapyModel;
        } else if (query.tumor_size) {
            model = expTumorSizeModel;
        }

        model.find(query, function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(data);
        });
    });

app.route("/snp")
    .get(function (req, res) {
        var response = {};
        snpModel.find(parseQuery(req.query), function (err, data) {
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(data);
        });
    });

app.listen(3000);
console.log("3000");