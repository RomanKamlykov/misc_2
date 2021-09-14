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
    const { nodeId } = JSON.parse(event.body);

    // create a new note
    const note = new Note({
      author: user.name,
      parentNodeId: nodeId,
    });

    // save the note
    const createdNote = await note.save();
    
    // redirect to the created note
    return {
      statusCode: 201,
      body: JSON.stringify({ note: createdNote }),
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
