const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const itemtableSchema = require('./itemtable.model');

const challanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  no: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    set: function(v) {
      const date = moment(v).format('DD/MM/YYYY');
      return date;
    }
  },
  amount: {
    type: String,
    required: true,
  },
  items: {
    type: [itemtableSchema],
    required: true,
  },
});

const Challan = mongoose.model('Challan', challanSchema);

module.exports = Challan;
