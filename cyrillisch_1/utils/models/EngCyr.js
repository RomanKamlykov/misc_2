const mongoose = require('mongoose');

const engCyrSchema = new mongoose.Schema({
  eng: {
    type: String,
    required: true
  },
  cyr: {
    type: String,
    required: true
  }
});
const EngCyr = mongoose.model('EngCyr', engCyrSchema);
module.exports = EngCyr;
