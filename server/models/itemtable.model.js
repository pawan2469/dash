const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemtableSchema = new Schema({
  noOfBoxes: {
    type: Number,
    required: [true, 'No of boxes is required.'],
    validate: {
      validator: (value) => value > 0,
      message: 'No of boxes must be greater than 0.',
    },
  },
  packing: {
    type: Number,
    required: [true, 'Packing is required.'],
    validate: {
      validator: (value) => value > 0,
      message: 'Packing must be greater than 0.',
    },
  },
  rate: {
    type: Number,
    required: [true, 'Rate is required.'],
    validate: {
      validator: (value) => value > 0,
      message: 'Rate must be greater than 0.',
    },
  },
  item_name: {
    type: String,
    required: [true, 'Item name is required.']
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required.'],
    validate: {
      validator: (value) => value >= 0,
      message: 'Subtotal cannot be negative.',
    },
  }
  
});

module.exports = itemtableSchema;

