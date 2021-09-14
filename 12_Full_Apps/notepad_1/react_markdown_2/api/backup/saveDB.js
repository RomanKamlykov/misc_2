const fs = require('fs');
const mongoose = require('mongoose');
const Note = require('./Note');
const { connUri, connOptions } = require('./connArguments');

async function setConnection(func) {
  const conn = await mongoose.connect(connUri, connOptions);
  await func();
  conn.disconnect();
}

async function getDocuments() {
  const notes = await Note.find({});

  const dateString = new Date().toLocaleDateString();
  const fileName = dateString.split('.').reverse().join('.');

  fs.writeFile(`${fileName}.txt`, JSON.stringify(notes), () => console.log('The file has been saved!'));
}

setConnection(getDocuments);
// node saveDB
