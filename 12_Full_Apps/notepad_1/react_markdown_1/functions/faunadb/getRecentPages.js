const { GET_RECENT_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async () => {
  const variables = { size: 10 };

  try {
    const { recentPages: { data: pages } } = await sendQuery(GET_RECENT_PAGES, variables);

    return {
      statusCode: 200,
      body: JSON.stringify(pages),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
