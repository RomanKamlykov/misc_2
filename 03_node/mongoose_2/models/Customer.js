const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

CustomerSchema.plugin(timestamp); // можем передать timestamp т.к. он является плагином к mongoose

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;