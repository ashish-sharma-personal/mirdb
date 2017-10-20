var mongoose    =   require("mongoose");
//mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;

var expressionSchema = {
    "miRNA_name":String,
    "cancer":String,
    "population_continent":String,
    "population_country":String,
    "sample":String,
    "regulation":String,
    "regulation_details":String,
    "significance":String,
    "technique":String,
    "marker":String,
    "marker_details":String,
    "therapy":String,
    "therapy_details":String,
    "stage":String,
    "stage_details":String,
    "reference":String

};

module.exports = mongoose.model('expressionData',expressionSchema);