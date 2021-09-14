const { createConnection } = require('mongoose');
const postSchema = require('./schemas/postSchema');
const { uri, options } = require('./utils/mongodbConnection');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = await createConnection(uri, options);
    conn.model('Post', postSchema); // defines a model
  }

  const Post = conn.model('Post'); // retrieves a model
  // get child posts
  const childPosts = await Post.find({ parentNodeId: '' }).sort({ title: 1 });
  // get recent posts
  const recentPosts = await Post.find().sort({ updatedAt: -1 }).limit(10);

  // await conn.close();
  return {
    statusCode: 200,
    body: JSON.stringify({ childPosts, recentPosts }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
