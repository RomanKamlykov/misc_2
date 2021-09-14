const express = require('express');
const MongoClient = require('mongodb').MongoClient; // документация https://github.com/mongodb/node-mongodb-native
var url = "mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2";

const router = express.Router();

// get liquids
router.get('/', async (req, res) => {
  const liquids = await loadLiquidsCollection();
  res.send(liquids);
})

async function loadLiquidsCollection() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const array = await client.db('full_stack_2').collection('liquids').aggregate([
    { $lookup:
      {
        from: 'prices',
        localField: 'card',
        foreignField: 'card',
        as: 'joinedData'
      }
    }
  ]).limit(30).toArray();

  client.close();
  return array;
}

async function loadLiquidsCollection2() {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const array = await client.db('full_stack_2').collection('liquids').find({}).toArray();

  client.close();
  return array;
}

module.exports = router;