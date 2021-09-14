const { GET_FAVORITE_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async () => {
  const variables = { isFavorite: true };

  try {
    const { favoritePages: { data: pages } } = await sendQuery(GET_FAVORITE_PAGES, variables);

    return {
      statusCode: 200,
      body: JSON.stringify(pages),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
