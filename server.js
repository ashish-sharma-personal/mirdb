var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var miRNAmongo = require("./model/miRNA");
var expressionMongo = require("./model/expression");
var snpMongo = require("./model/snp");
var fs = require('fs');
// var funcData = require('./function.json');
// var exprData = require('./expression.json');
// var snpData = require('./snp.json');

var basicAuth = require('connect-basic-auth');

app.use(bodyParser.json());
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ "extended": false }));

function parseQuery(originalQuery) {
    const query = {};
    for (const key in originalQuery) {
        query[key] = new RegExp(originalQuery[key] + '$', 'i');
    }
    return query;
}

app.use(basicAuth(function (credentials, req, res, next) {
    if (credentials === undefined || credentials['username'] !== 'username' || credentials['password'] !== 'password') {
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

app.route("/miRNA")
    .get(function (req, res) {
        var response = {};
        miRNAmongo.find(parseQuery(req.query), function (err, data) {
            // Mongo command to fetch all data from collection.
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
        var response = {};
        expressionMongo.find(parseQuery(req.query), function (err, data) {
            // Mongo command to fetch all data from collection.
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
        snpMongo.find(parseQuery(req.query), function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = { "error": true, "message": "Error fetching data" };
            } else {
                response = { "error": false, "message": data };
            }
            res.json(data);
        });
    });

// var len = funcData.length;
// for (var i = 0; i < len; i++) {
//     var db = new miRNAmongo();
//     db.miRNA_name = funcData[i].miRNA_name;
//     db.cancer = funcData[i].cancer;
//     db.cell_line = funcData[i].cell_line;
//     db.targetD = funcData[i].targetD;
//     db.technique = funcData[i].technique;
//     db.functionName = funcData[i].functionName;
//     db.reference = funcData[i].reference;

//     db.save(function (err) {
//         if (err) {
//             console.log('error');
//             response = { "error": true, "message": "Error adding data" };
//         } else {
//             console.log('success');
//             response = { "error": false, "message": "Data added" };
//         }

//     });
// }

// var len = exprData.length;
// for (var i = 0; i < len; i++) {
//     var db = new expressionMongo();
//     db.miRNA_name = exprData[i].miRNA_name;
//     db.cancer = exprData[i].cancer;
//     db.population_continent = exprData[i].population_continent;
//     db.population_country = exprData[i].population_country;
//     db.sample = exprData[i].sample;
//     db.expression = exprData[i].expression;
//     db.expression_details = exprData[i].expression_details;
//     db.significance = exprData[i].significance;
//     db.technique = exprData[i].technique;
//     db.marker = exprData[i].marker;
//     db.marker_details = exprData[i].marker_details;
//     db.therapy = exprData[i].therapy;
//     db.therapy_details = exprData[i].therapy_details;
//     db.stage = exprData[i].stage;
//     db.stage_details = exprData[i].stage_details;
//     db.reference = exprData[i].reference;

//     db.save(function (err) {
//         if (err) {
//             response = { "error": true, "message": "Error adding data" };
//         } else {
//             response = { "error": false, "message": "Data added" };
//         }

//     });
// }

// var len = snpData.length;
// for (var i = 0; i < len; i++) {
//     var db = new snpMongo();
//     db.miRNA_name = snpData[i].miRNA_name;
//     db.cancer = snpData[i].cancer;
//     db.population_continent = snpData[i].population_continent;
//     db.population_country = snpData[i].population_country;
//     db.functionName = snpData[i].functionName;
//     db.snp = snpData[i].snp;
//     db.reference = snpData[i].reference;

//     db.save(function (err) {
//         if (err) {
//             response = { "error": true, "message": "Error adding data" };
//         } else {
//             response = { "error": false, "message": "Data added" };
//         }

//     });
// }

// app.use('/',router);

// fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });


app.listen(3000);
console.log("Listening to PORT 3000");