const { Schema } = require('mongoose');

const pageSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  markdown: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  parentKey: {
    type: String,
    required: true,
    default: '0',
  },
  key: {
    type: String,
    required: true,
    default: Date.now,
  },
});

module.exports = pageSchema;
