const mongoose = require('mongoose');
const addressSchema = require('./address.model');
const itemtableSchema = require('./itemtable.model');
const Schema = mongoose.Schema;

const taxSchema = new Schema({
  rates: {
    type: Map,
    of: Number,
    required: true,
    default: {}
  }
});
const invoiceSchema = new Schema({
  no: {
    type: Number,
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  bill_address: {
    type: addressSchema,
    required: true
  },
  date: {
    type: Date,
    required: true,
    set: function(v) {
      const date = moment(v).format('DD/MM/YYYY');
      return date;
    }
  },
  ship_address: {
    type: addressSchema,
    required: true
  },
  GSTN: {
    type: String,
    match: [/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/, 'Please enter a valid GSTN number']
  },
  email: {
    type: String,
    required: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
  },
  contact: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number']
  },
  items: {
    type: [itemtableSchema],
    required: true
  },
  total_qty:{
    type: Number,
    required: true
  },
  taxable_amount:{
    type:Number,
    required:true,
  },
  round_off:{
    type:Number,
    required:true,
  },
  total_tax: {
    // Define tax rates for each HSN code
    cgst: {
      type: taxSchema,
      required: true,
      default: { rates: { 'default': 9 } }
    },
    sgst: {
      type: taxSchema,
      required: true,
      default: { rates: { 'default': 9 } }
    },
    igst: {
      type: taxSchema,
      required: true,
      default: { rates: { 'default': 18 } }
    }
  },
  vehicle_no: {
    type: String,
    required: true,
    // match: [/^[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{4}$/, 'Please enter a valid vehicle number']
  },
  ewaybill_no: {
    type: String,
    required: true,
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Eway Bill number']
  }, 
  tr_no: {
    type: Number,
    required: false
  },
  tr_name:{
    type:String,
    required:false
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;

