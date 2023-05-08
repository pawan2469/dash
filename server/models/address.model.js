const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry'
];

const addressSchema = new Schema({
    line1: { 
        type: String,
        required: true 
    },
    line2: { 
        type: String 
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z\s]*$/.test(v) && indianStates.includes(v);
            },
            message: props => `${props.value} is not a valid Indian state name!`
        }
    },
    pin: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[1-9][0-9]{5}$/.test(v);
            },
            message: props => `${props.value} is not a valid Indian pin code!`
        }
    }
});

module.exports = addressSchema;


