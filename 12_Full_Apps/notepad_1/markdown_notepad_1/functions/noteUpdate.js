require('dotenv').config();
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
    conn.model('Note', noteSchema); // define a model
  }

  try {
    // retrieve a model
    const Note = conn.model('Note');
    const { id, markdown, parentId } = JSON.parse(event.body); 

    // 1. update the markdown & title
    if (id && markdown) {
      const updatedNote = await Note.findOneAndUpdate(
        { author: user.name, _id: id },
        { $set: { markdown, title: titleMaker(markdown), updatedAt: Date.now() } },
        { new: true },
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ note: updatedNote }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    }

    // 2. update the parentId
    if (id && parentId) {
      
      // ----- checks -----
      // check if passed note IDs are invalid
      const note = await Note.findOne(
        { author: user.name, _id: id },
      );
      const parentNote = await Note.findOne(
        { author: user.name, _id: parentId },
      );
      // check if a parent note exist
      if (parentNote === null) throw "The passed note ID doesn't exist!";
      // check if a current note ID and a parent note ID are the same
      if (note.id === parentNote.id) throw "The passed parent ID is equal to the current note ID!";
      // check if the new path is valid
      let x = parentNote; let loopLimit = 30;
      while (x.parentNodeId && loopLimit) {
        x = await Note.find(
          { author: user.name, nodeId: x.parentNodeId },
        );
        // x = allNotes.find((el) => el.nodeId === x.parentNodeId);
        loopLimit -= 1;
        if (loopLimit == 0) throw "To deep to move :)";
        if (x.id === note.id) throw "The passed parent ID is a child to the current note ID!";
      }

      // ----- action -----
      const updatedNote = await Note.findOneAndUpdate(
        { author: user.name, _id: id },
        { $set: { parentNodeId: parentNote.nodeId, updatedAt: Date.now() } },
        { new: true },
      );

      const updatedPath = [updatedNote];
      for (let i = 0; i < 2; i++) {
        const x = await Note.findOne(
          { author: user.name, nodeId: updatedPath[0].parentNodeId },
        );
        if (!x) break;
        updatedPath.unshift(x);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ path: updatedPath }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
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
