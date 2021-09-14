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
    const { id } = JSON.parse(event.body);

    // get the note
    const note = await Note.findOne(
      { author: user.name, _id: id },
    );
    // check if there is a child note
    const childNote = await Note.findOne(
      { author: user.name, parentNodeId: note.nodeId },
    );
    if (childNote) throw "The note has a child note!";

    // delete the note
    await Note.findOneAndDelete(
      { author: user.name, _id: id },
    );
    
    // find a parent note
    const parentNote = await Note.findOne(
      { author: user.name, nodeId: note.parentNodeId },
    );
    
    // redirect to the parent note
    return {
      statusCode: 200,
      body: JSON.stringify({ parentNote }),
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
