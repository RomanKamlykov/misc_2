const mongodb = require('mongodb');
const config = require('../config');
const getDataFromSheets = require('./getDataFromSheets');
const getDataFromExcel = require('./getDataFromExcel');

const MONGODB_URI = 'mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2';
const db = 'full_stack_2';
// const collection = 'liquids';

async function loadCollection(collection) {
  const client = await mongodb.MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
  return client.db(db).collection(collection);
}

async function get() {
  const collection = await loadCollection();
  // const documents = await collection.find({}).toArray() // all documents
  // const document = await collection.find({ text: 'jkljk' }).toArray() // a document
  console.log(documents);
}

async function insertMany(collectionName) {
  const collection = await loadCollection(collectionName);
  const array = await getDataFromSheets();
  // const headers = data[0];

  // const array = data.slice(1).map((row) => {
  //   const newRow = {};

  //   headers.forEach((el, i) => {
  //     newRow[el] = row[i].trim();
  //   })

  //   return newRow;
  // });
  await collection.deleteMany({}); // удаляет все документы из коллекции
  await collection.insertMany(array); // добавляет документы в коллекцию
  return console.log('Added!');
}

async function insertMany2(collectionName) {
  const collection = await loadCollection(collectionName);
  const array = await getDataFromExcel();

  await collection.deleteMany({}); // удаляет все документы из коллекции
  await collection.insertMany(array); // добавляет документы в коллекцию
  return console.log('Added!');
}

// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.insertOne({ text: req.body.text, createdAt: new Date() });
//   res.status(201).send(); // 201 - значит все Ок + что-то было создано
// })

insertMany('liquids');
insertMany2('prices');