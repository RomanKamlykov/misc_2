const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  card: {
    type: String,
    default: '',
  },
  mySegm: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
});

const Product = model('Product', productSchema);
module.exports = { Product, productSchema };
