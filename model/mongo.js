var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/demoDb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;

var miRNASchema = {
    "miRNA_name":String,
    "cancer":String,
    "cell_line":String,
    "targetD":String,
    "technique":String,
    "functionName":String,
    "link_addr":String
};

module.exports = mongoose.model('miRNAData',miRNASchema);