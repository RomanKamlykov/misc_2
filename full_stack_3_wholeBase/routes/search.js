const router = require('express').Router();
const Product = require('./models/Product');
// const { MongoClient } = require('mongodb');
// const config = require('../config');

router.get('/', async (req, res) => {
  console.log(req.query);

  const card = (req.query.card) ? decodeURIComponent(req.query.card) : '';
  const mySegm = (req.query.mySegm) ? decodeURIComponent(req.query.mySegm) : '';
  const code = (req.query.code) ? decodeURIComponent(req.query.code) : '';
  const titleArray = (req.query.title) ? decodeURIComponent(req.query.title).split(' ') : ''; // makes an array of keywords
  const desc = (req.query.desc) ? decodeURIComponent(req.query.desc).split(' ') : '';
  const page = (req.query.page) ? decodeURIComponent(req.query.page) : 0;

  if (card || mySegm || code || titleArray.length > 0 || desc.length > 0) {
    const data = await queryFromMongoDB({
      card, mySegm, code, titleArray, desc, page,
    });
    res.send(data);
  } else {
    res.sendStatus(400);
  }
});

async function queryFromMongoDB({
  card, mySegm, code, titleArray, desc, page,
}) {
  // const client = await MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true });

  const arrayOfQueryObjects = [];
  if (card) { arrayOfQueryObjects.push({ card: new RegExp(card) }); }
  if (mySegm) { arrayOfQueryObjects.push({ mySegm: new RegExp(mySegm, 'i') }); }
  if (code) { arrayOfQueryObjects.push({ code: new RegExp(code, 'i') }); }
  if (titleArray.length > 0) { titleArray.forEach((el) => arrayOfQueryObjects.push({ title: new RegExp(el, 'i') })); }
  if (desc.length > 0) { desc.forEach((el) => arrayOfQueryObjects.push({ desc: new RegExp(el, 'i') })); }
  console.log(arrayOfQueryObjects);

  // const array = await client.db().collection(config.MONGODB_COLLECTION)
  // .find({ $and: arrayOfQueryObjects })
  // .skip(page * config.NUMBER_OF_VALUES_ON_A_PAGE)
  //   .limit(Number.parseInt(config.NUMBER_OF_VALUES_ON_A_PAGE))
  //   .toArray();

  // client.close();
  const array = await Product.find({ $and: arrayOfQueryObjects })
    .sort('field title')
    .skip(page * 50)
    .limit(50);
    // .toArray();
  return array;
}

module.exports = router;
