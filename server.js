var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var functionMongo = require("./model/function");
var expressionMongo = require("./model/expression");
var snpMongo = require("./model/snp");
var fs = require('fs');
var funcData = require('./function.json');
var exprData = require('./expression.json');
var snpData = require('./snp.json');

var basicAuth = require('connect-basic-auth');

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

app.route("/miRNA")
    .get(function (req, res) {
        var response = {};
        functionMongo.find(parseQuery(req.query), function (err, data) {
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

// var len = exprData.length;
// for (var i = 0; i < len; i++) {
//     var db = new expressionMongo();
//     Object.assign(db, exprData[i]);

//     db.save(function (err) {
//         if (err) {
//             response = { "error": true, "message": "Error adding data" };
//         } else {
//             response = { "error": false, "message": "Data added" };
//         }
//     });
// }

// var len = funcData.length;
// for (var i = 0; i < len; i++) {
//     var db = new functionMongo();
//     Object.assign(db, funcData[i]);
//     db.save(function (err) {
//         if (err) {
//             console.log('error');
//             response = { "error": true, "message": "Error adding data" };
//         } else {
//             response = { "error": false, "message": "Data added" };
//         }

//     });
// }

// var len = snpData.length;
// for (var i = 0; i < len; i++) {
//     var db = new snpMongo();
//     Object.assign(db, snpData[i]);
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


app.listen(3001);
console.log("Listening to PORT 3001");