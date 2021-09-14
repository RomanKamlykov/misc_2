const { createConnection } = require('mongoose');
const fs = require('fs');
const pageSchema = require('../schemas/pageSchema');
const { connOptions } = require('./connArguments');

const connUri = 'mongodb+srv://<user>:<password>@cluster0.whqg7.mongodb.net/pages';

let conn = null;

async function setConnection(func) {
  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('Page', pageSchema); // defines a model
  }
  func();
}

async function getDocuments() {
  const Page = conn.model('Page'); // retrieves a model
  const pages = await Page.find({});
  fs.writeFile('result.txt', JSON.stringify(pages), () => console.log('The file has been saved!'));
  await conn.close();
}

setConnection(getDocuments);

// for (let i = 0; i < data.length; i++) {
//   data[i].key = String(data[i].createdAt);
// }

// // console.log(Boolean(data[0].parentKey != "0"));

// for (let i = 0; i < data.length; i++) {
//   if (data[i].parentKey != '0') {
//     const elem = data.find((el) => Boolean(el._id == data[i].parentKey));
//     data[i].parentKey = elem.key;
//   }
// }

// for (let i = 0; i < data.length; i++) {
//   delete data[i]._id;
// }
