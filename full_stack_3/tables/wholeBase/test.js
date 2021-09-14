const MongoClient = require('mongodb').MongoClient;
// const config = require('../config');
const getDataFromExcel = require('./getDataFromExcel');

const MONGODB_URI = 'mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2';
const db = 'full_stack_2';

// async function loadCollection(collection) {
//   const client = await mongodb.MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
//   return client.db(db).collection(collection);
// }

async function insertMany(collectionName) {
  const array = await getDataFromExcel();

  const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
  const collection = client.db(db).collection(collectionName);
  await collection.deleteMany({}); // удаляет все документы из коллекции
  await collection.insertMany(array); // добавляет документы в коллекцию
  client.close();

  return console.log('Added!');
}

insertMany('wholeBase');