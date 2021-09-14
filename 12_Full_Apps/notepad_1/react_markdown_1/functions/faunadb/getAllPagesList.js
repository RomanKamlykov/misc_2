const { GET_ALL_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async () => {
  try {
    const { allArticles: articles } = await sendQuery(GET_ALL_PAGES);

    return {
      statusCode: 200,
      body: JSON.stringify(articles),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
