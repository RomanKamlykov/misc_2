const { readFileSync } = require('fs');
const { createConnection } = require('mongoose');
const pageSchema = require('../schemas/pageSchema');
const { connOptions } = require('./connArguments');

const pages = JSON.parse(readFileSync('./result.txt'));

const connUri = 'mongodb://localhost:27017/react_markdown_3';

let conn = null;

async function setConnection(func) {
  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('Page', pageSchema); // defines a model
  }
  func();
}

async function addDocuments() {
  const Page = conn.model('Page'); // retrieves a model
  await Page.deleteMany();
  await Page.create(pages);
  await conn.close();
}

setConnection(addDocuments);
