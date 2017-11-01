var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;

var snpDataSchema = {
    "miRNA_name":String,
    "cancer":String,
    "population_continent":String,
    "population_country":String,
    "functionName":String,
    "snp":String,
    "reference":String

};

module.exports = mongoose.model('snpAllData',snpDataSchema);