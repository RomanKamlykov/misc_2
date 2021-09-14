const { READ_PAGE } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const variables = { id };

  try {
    const { findPageByID: page } = await sendQuery(READ_PAGE, variables);
    return {
      statusCode: 200,
      body: JSON.stringify(page),
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
