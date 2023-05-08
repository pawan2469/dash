const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
        size: {type: String, required: true},
        colour: {type: String, required: true},
        company: {type: String, required: true},
        shape: {type: String,required: true},
        packing: {type: String,required: true},
        quantity: {type: String,required: true},
        weight:{type:String,required:true},
        neck: {type: String,required: true}
});
const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;