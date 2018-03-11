var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema = mongoose.Schema;

var expTumorSizeSchema = {
    "miRNA_name": String, "cancer": String, "tumor_size": String, "tumor_size_details": String, "expression": String, "detection_method": String, "sample_type": String, "sample": String, "continent": String, "population": String, "reference": String
};

module.exports = mongoose.model('expTumorSizeData', expTumorSizeSchema);