const { createConnection } = require('mongoose');
const postSchema = require('./schemas/postSchema');
const { uri, options } = require('./utils/mongodbConnection');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { q } = event.queryStringParameters;

  if (conn == null) {
    conn = await createConnection(uri, options);
    conn.model('Post', postSchema); // defines a model
  }

  const Post = conn.model('Post'); // retrieves a model
  // get a posts
  const posts = await Post.find({ markdown: { $regex: `.*${q}.*`, $options: 'i' } }).sort({ updatedAt: -1 });

  // await conn.close();
  return {
    statusCode: 200,
    body: JSON.stringify({ posts }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
