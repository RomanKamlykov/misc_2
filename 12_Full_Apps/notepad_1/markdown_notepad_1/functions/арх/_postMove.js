const { createConnection } = require('mongoose');
const { noteSchema } = require('./mongodb/models/Note');
const { connUri, connOptions } = require('./mongodb/mongodbConnection');
const verifyToken = require('./utils/verifyToken.js');


let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const user = verifyToken(event.headers);

  if (user == null) {
    if (!process.env.NETLIFY) conn.close(() => console.log("Connection closed."));
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

    const { id, parentId } = JSON.parse(event.body);
    const { name } = user;
    // let currentNote = {};
    // let parentNote = {};

    // ----- checks -----
    // check if passed note IDs are invalid
    const note = await Note.findOne({ author: name, _id: id });
    const parentNote = await Note.findOne({ author: name, _id: parentId });
    // check if a parent note exist
    if (parentNote === null) throw "The passed note ID doesn't exist!";
    // check if a current note ID and a parent note ID are the same
    if (note.id === parentNote.id) throw "The passed parent ID is equal to the current note ID!";
    // check if the new path is valid
    let x = parentNote; let loopLimit = 30;
    // const allNotes = await Note.find({ author: name });
    while (x.parentNodeId && loopLimit) {
      x = await Note.find({ author: name, nodeId: x.parentNodeId });
      // x = allNotes.find((el) => el.nodeId === x.parentNodeId);
      loopLimit -= 1;
      if (loopLimit == 0) throw "To deep to move :)";
      if (x.id === note.id) throw "The passed parent ID is a child to the current note ID!";
    }

    // ----- action -----
    const filter = { author: name, _id: id };
    const update = { $set: { parentNodeId: parentNote.nodeId, updatedAt: Date.now() } };
    const options = { new: true };
    const updatedNote = await Note.findOneAndUpdate(filter, update, options);

    const newPath = [];
    newPath.unshift(updatedNote);
    for (let i = 0; i < 2; i++) {
      const filter = { author: user.name, nodeId: newPath[0].parentNodeId }
      const note = await Note.findOne(filter);
      if (!note) break;
      newPath.unshift(note);
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ path: newPath }),
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
    if (!process.env.NETLIFY) conn.close(() => console.log("Connection closed."));
  }
}