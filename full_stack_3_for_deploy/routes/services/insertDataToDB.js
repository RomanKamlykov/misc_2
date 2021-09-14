const MongoClient = require('mongodb').MongoClient
const config = require('../../config')

async function insertDataToDB(array) {
  const client = await MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true })
  const collection = client.db().collection(config.MONGODB_COLLECTION)
  await collection.deleteMany({}) // deletes all documents in the collection
  await collection.insertMany(array) // inserts new documents into the collection
  client.close()
  return
}

module.exports = insertDataToDB