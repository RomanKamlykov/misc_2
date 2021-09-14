const { GET_FIRST_PAGE } = require('./utils/articleQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async () => {
  try {
    const { allArticles: article } = await sendQuery(GET_FIRST_PAGE);
    console.log(article);

    return {
      statusCode: 200,
      body: JSON.stringify(article),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
