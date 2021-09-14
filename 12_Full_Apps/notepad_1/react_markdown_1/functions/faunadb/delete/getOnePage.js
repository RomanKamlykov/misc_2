const mongoose = require('mongoose');
require('dotenv').config();
const Page = require('../models/Page');

const { USER, PASSWORD, DBNAME } = process.env;
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;

exports.handler = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    const page = await Page.findById('5fad948acea41a2348a9eb21');
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
