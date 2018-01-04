var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var expMarkerSchema = {
    "miRNA_name": String, "cancer": String, "marker": String, "marker_details": String, "expression": String, "significance": String, "sample_type": String, "sample": String, "continent": String, "population": String, "detection_method": String, "reference": String
};

module.exports = mongoose.model('expMarkerData', expMarkerSchema);