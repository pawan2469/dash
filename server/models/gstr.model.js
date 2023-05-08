const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hsnSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Amount must be greater than 0.'
    }
  },
  quantity: {
    type: Number,
    required: true
  }
});

const gstrSchema = new Schema({
  GSTN: {
    type: String,
    required: true,
    match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/, 'Please enter a valid GSTN number']
  },
  invoice_no: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cgst: {
    type: Number,
    required: true
  },
  sgst: {
    type: Number,
    required: true
  },
  igst: {
    type: Number,
    required: true
  },
  total_quantity: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Total quantity must be greater than 0.'
    }
  },
  total_amount: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: 'Total amount must be greater than 0.'
    }
  },
  hsn_codes: [hsnSchema]
});

const Gstr = mongoose.model('Gstr', gstrSchema);

module.exports = Gstr;
