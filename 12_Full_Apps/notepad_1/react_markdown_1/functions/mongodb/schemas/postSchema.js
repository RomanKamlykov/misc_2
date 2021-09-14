const { Schema, model } = require('mongoose');

const postSchema = new Schema({
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

// const Post = model('Post', postSchema);
module.exports = postSchema;
