const { readFileSync } = require('fs');
const mongoose = require('mongoose');
const Note = require('./Note');
const { connUri, connOptions } = require('./connArguments');

const notes = JSON.parse(readFileSync('./notes.txt')); // изменить!!

async function setConnection(func) {
  const conn = await mongoose.connect(connUri, connOptions);
  await func();
  conn.disconnect();
}

async function addDocuments() {
  await Note.deleteMany();
  await Note.create(notes);
}

setConnection(addDocuments);
// node writeToDb
