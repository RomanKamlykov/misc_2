const { createConnection } = require('mongoose');
const { productSchema } = require('./models/Product');
const { connUri, connOptions } = require('./utils/mongodbConnection');

let conn = null;

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const query = event.queryStringParameters;

  if (conn == null) {
    conn = await createConnection(connUri, connOptions);
    conn.model('Product', productSchema); // defines a model
  }

  // 1.
  const card = (query.card) ? decodeURIComponent(query.card) : '';
  const mySegm = (query.mySegm) ? decodeURIComponent(query.mySegm) : '';
  const code = (query.code) ? decodeURIComponent(query.code) : '';
  const titleArray = (query.title) ? decodeURIComponent(query.title).split(' ') : ''; // makes an array of keywords
  const desc = (query.desc) ? decodeURIComponent(query.desc).split(' ') : '';
  const page = (query.page) ? decodeURIComponent(query.page) : 0;

  if (card || mySegm || code || titleArray.length > 0 || desc.length > 0) {
    const Product = conn.model('Product'); // retrieves a model

    // 2.
    const arrayOfQueryObjects = [];
    if (card) { arrayOfQueryObjects.push({ card: new RegExp(card) }); }
    if (mySegm) { arrayOfQueryObjects.push({ mySegm: new RegExp(mySegm, 'i') }); }
    if (code) { arrayOfQueryObjects.push({ code: new RegExp(code, 'i') }); }
    if (titleArray.length > 0) { titleArray.forEach((el) => arrayOfQueryObjects.push({ title: new RegExp(el, 'i') })); }
    if (desc.length > 0) { desc.forEach((el) => arrayOfQueryObjects.push({ desc: new RegExp(el, 'i') })); }

    const products = await Product.find({ $and: arrayOfQueryObjects })
      .sort('field title')
      .skip(page * 50)
      .limit(50);

    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } else {
    return {
      statusCode: 400,
    }
  }
}
