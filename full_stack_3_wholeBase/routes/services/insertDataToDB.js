const Product = require('../models/Product');
// const { MongoClient } = require('mongodb');
// const config = require('../../config');

async function insertDataToDB(array) {
  // const client = await MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true });
  // const collection = client.db().collection(config.MONGODB_COLLECTION);
  await Product.deleteMany({}); // deletes all documents in the collection
  await Product.insertMany(array); // inserts new documents into the collection
  // client.close();
}

module.exports = insertDataToDB;
