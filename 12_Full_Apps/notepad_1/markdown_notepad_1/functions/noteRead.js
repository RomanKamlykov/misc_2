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
    const { id } = event.queryStringParameters;

    // get a note
    const note = await Note.findOne(
      { author: user.name, _id: id },
    );
    // get child notes
    const childNotes = await Note.find(
      { author: user.name, parentNodeId: note.nodeId },
    ).sort(
      { title: 'asc' },
    );
    // get a path
    const path = [note];
    for (let i = 0; i < 2; i++) {
      const x = await Note.findOne(
        { author: user.name, nodeId: path[0].parentNodeId },
      );
      if (!x) break;
      path.unshift(x);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ note, childNotes, path, }),
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
