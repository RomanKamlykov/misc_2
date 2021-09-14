require('dotenv').config();
const { createConnection } = require('mongoose');
const { noteSchema } = require('./mongodb/models/Note');
const { connUri, connOptions } = require('./mongodb/mongodbConnection');
const verifyToken = require('./utils/verifyToken.js');


let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = verifyToken(event.headers);

  if (user == null) {
    return {
      statusCode: 400,
    }
  }

  // set a connection
  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('Note', noteSchema); // define a model
  }
  
  try {
    // retrieve a model
    const Note = conn.model('Note');
    const { query } = event.queryStringParameters;

    // get some notes
    const notes = await Note.find(
      { author: user.name, markdown: { $regex: query, $options: 'i' } },
    ).sort(
      { updatedAt: 'desc' },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ query, notes }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
    }
  } finally {
    if (process.env.DEV) conn.close(() => console.log("Connection closed."));
  }
}