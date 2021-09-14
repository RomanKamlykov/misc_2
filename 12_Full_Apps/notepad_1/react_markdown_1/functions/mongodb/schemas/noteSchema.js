// const { Schema, model } = require('mongoose');
const { Schema } = require('mongoose');

const noteSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  markdown: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    required: true,
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
  parentNodeId: {
    type: String,
    default: '',
  },
  nodeId: {
    type: String,
    required: true,
    default: Date.now,
  },
});

// const Note = model('Note', noteSchema);
module.exports = noteSchema;
