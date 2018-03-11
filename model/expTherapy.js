var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var expTherapySchema = {
    "miRNA_name": String, "cancer": String, "therapy": String, "therapy_details": String, "expression": String, "significance": String, "detection_method": String, "sample_type": String, "sample": String, "continent": String, "population": String, "reference": String
};

module.exports = mongoose.model('expTherapy', expTherapySchema);