const mongoose = require('mongoose');
require('dotenv').config();
const Page = require('../models/Page');

const { USER, PASSWORD, DBNAME } = process.env;
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;

exports.handler = async (event) => {
  const { title, body } = JSON.parse(event.body);

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    const page = new Page({
      title,
      body,
    });

    await page.save();
    await mongoose.disconnect();

    return {
      statusCode: 200,
      body: JSON.stringify(page),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
