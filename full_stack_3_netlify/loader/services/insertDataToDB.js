const mongoose = require('mongoose');
const { Product } = require('./models/Product');
const { connUri, connOptions } = require('./connArguments');

async function insertDataToDB(array) {
  try {
    const conn = await mongoose.connect(connUri, connOptions); // set a connection 
    await Product.deleteMany({}); // delete all documents in a collection
    await Product.insertMany(array); // insert some new documents to the collection
    conn.disconnect(); // disconnect
    return 'OK'
  } catch (error) {
    return 'ERROR'
  }
}

module.exports = insertDataToDB;
