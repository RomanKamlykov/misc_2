const { createConnection } = require('mongoose');
const postSchema = require('./schemas/postSchema');
const { uri, options } = require('./utils/mongodbConnection');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { id } = event.queryStringParameters;

  if (conn == null) {
    conn = await createConnection(uri, options);
    conn.model('Post', postSchema); // defines a model
  }

  const Post = conn.model('Post'); // retrieves a model
  // get a post
  const post = await Post.findById(id);
  // get child posts
  const childPosts = await Post.find({ parentNodeId: post.nodeId }).sort({ title: 1 });
  // get the path
  const path = []; let loopLimit = 10;
  const allPosts = await Post.find();
  path.unshift(post);
  while (Boolean(loopLimit) && (path[0].parentNodeId)) {
    path.unshift(allPosts.find((el) => String(el.nodeId) === path[0].parentNodeId));
    loopLimit -= 1;
  }

  // await conn.close();
  return {
    statusCode: 200,
    body: JSON.stringify({ path, post, childPosts }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
