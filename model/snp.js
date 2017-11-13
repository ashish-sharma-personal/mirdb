var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var snpDataSchema = {
    "miRNA_name": String,
    "cancer": String,
    "cancer": String,
    "continent": String,
    "population": String,
    "sample": String,
    "function": String,
    "snp": String,
    "reference": String
};

module.exports = mongoose.model('snpAllData', snpDataSchema);