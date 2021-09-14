const { createConnection } = require('mongoose');
const pageSchema = require('../schemas/pageSchema');
const { connOptions } = require('./connArguments');
const data = require('./allDocuments');

const connUri = 'mongodb+srv://<user>:<password>@cluster0.whqg7.mongodb.net/pages';

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
  await Page.create(data);
  await conn.close();
}

setConnection(addDocuments);
