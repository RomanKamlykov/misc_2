const { createConnection } = require('mongoose');
const { noteSchema } = require('./mongodb/models/Note');
const { connUri, connOptions } = require('./mongodb/mongodbConnection');
const verifyToken = require('./utils/verifyToken.js');
const titleMaker = require('./utils/titleMaker.js');

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
    conn.model('Note', noteSchema); // defines a model
  }

  try {
    // retrieve a model
    const Note = conn.model('Note');

    const { id, markdown } = JSON.parse(event.body); 
    const { name } = user;

    const filter = { author: name, _id: id };
    const update = { $set: { markdown, title: titleMaker(markdown), updatedAt: Date.now() } };
    const options = { new: true };

    // update the note
    const note = await Note.findOneAndUpdate(filter, update, options);
    
    // respond
    // if (!process.env.NETLIFY) conn.close();
    return {
      statusCode: 200,
      body: JSON.stringify({ note }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    // if (!process.env.NETLIFY) conn.close();
    return {
      statusCode: 400,
    }
  } finally {
    if (!process.env.NETLIFY) conn.close(() => console.log("Connection closed."));
  }
}
