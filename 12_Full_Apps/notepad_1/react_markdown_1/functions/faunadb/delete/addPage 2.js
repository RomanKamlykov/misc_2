const mongoose = require('mongoose');
require('dotenv').config();
const pageSchema = require('../schemas/page');

const { USER, PASSWORD, DBNAME } = process.env;

let conn = null;
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;

// exports.handler = async (event) => {
//   const { title, body } = JSON.parse(event.body);

//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     });

//     const page = new Page({
//       title,
//       body,
//     });

//     await page.save();
//     mongoose.disconnect();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(page),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Something went wrong' }),
//     };
//   }
// };

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  if (conn == null) {
    conn = mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    await conn;
    conn.model('Page', pageSchema); // defines a model
  }

  const Page = conn.model('Page'); // retrieves a model
  const { title, body } = JSON.parse(event.body);
  const page = new Page({
    title,
    body,
  });
  const newPage = await page.save();
  // const doc = await Page.findOne();
  await conn.close();
  return {
    statusCode: 200,
    body: JSON.stringify(newPage),
  };
};
