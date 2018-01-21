var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var funcTarget = {
    "miRNA_name": String,
    "cancer": String,
    "cell_line": String,
    "target": String,
    "target_details": String,
    "technique": String,
    "function": String,
    "function_details": String,
    "reference": String
};

module.exports = mongoose.model('funcTargetData', funcTarget);