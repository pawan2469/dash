const mongoose = require('mongoose');
const addressSchema = require('./address.model');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
        name: {type: String, 
                required: true},
        bill_address: {type: addressSchema,
                       required: true},
        ship_address: {type: addressSchema,
                       required: true},
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
              }
});
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

