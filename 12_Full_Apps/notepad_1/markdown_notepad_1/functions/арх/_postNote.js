const { createConnection } = require('mongoose');
const { noteSchema } = require('./mongodb/models/Note');
const { connUri, connOptions } = require('./mongodb/mongodbConnection');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = event.queryStringParameters;

  // set a connection
  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('Note', noteSchema); // defines a model
  }

  // const { parentNodeId } = req.body;
  // const { name: author } = req.user;

  try {
    // retrieve a model
    const Note = conn.model('Note');

    // create a new note
    const note = new Note({
      author,
      parentNodeId,
    });

    // save the note
    const { _id: createdNoteId } = await note.save();
    
    // redirect to created note
    // if (!process.env.NETLIFY) conn.close();
    return {
      statusCode: 201,
      body: JSON.stringify({ createdNoteId }),
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
