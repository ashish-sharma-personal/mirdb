var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var expressionSchema = {
    "miRNA": String,
    "cancer": String,
    "cancer_subtype": String,
    "continent": String,
    "population": String,
    "sample_type": String,
    "sample": String,
    "expression": String,
    "expression_details": String,
    "significance": String,
    "detection_method": String,
    "marker": String,
    "marker_details": String,
    "response_to_therapy": String,
    "response_to_therapy_details": String,
    "tumor_size": String,
    "tumor_size_details": String,
    "reference": String
};

module.exports = mongoose.model('expressionData', expressionSchema);