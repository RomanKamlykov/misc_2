const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2";

const router = express.Router();

router.get('/', async (req, res) => {
  const brand = (req.query.brand) ? decodeURIComponent(req.query.brand) : '';
  const number = (req.query.number) ? decodeURIComponent(req.query.number) : '';
  const nameArray = (req.query.name) ? decodeURIComponent(req.query.name).split(' ') : ''; // makes an array of words
  // const _id = (req.query._id) ? decodeURIComponent(req.query._id) : '';
  const page = (req.query.page) ? decodeURIComponent(req.query.page) : 0;
  
  if( brand || number || nameArray.length > 0 ) {
    const data = await queryFromBase({ brand, number, nameArray, page });
    res.send(data);
  } else {
    res.sendStatus(400);
  }
})

async function queryFromBase({ brand, number, nameArray, page }) {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const arrayOfQueryObjects = [];
  if(brand) { arrayOfQueryObjects.push({ brand: new RegExp(brand, 'i') }) }
  if(number) { arrayOfQueryObjects.push({ number: new RegExp(number, 'i') }) }
  if(nameArray.length > 0) { nameArray.forEach( el => arrayOfQueryObjects.push({ name: new RegExp(el, 'i') }) )}
  // const arrayOfQueryObjects = nameArray.map(el => new RegExp(el, 'i')).map(el => { return { name: el} }); // makes an array of query objects
  // if(_id) { arrayOfQueryObjects.push({ _id: { $gt: _id } }) }
  
  const array = await client.db('full_stack_2').collection('wholeBase').find({ $and: arrayOfQueryObjects }).skip(page*50).limit(50).toArray();

  client.close();
  return array;
}

module.exports = router;