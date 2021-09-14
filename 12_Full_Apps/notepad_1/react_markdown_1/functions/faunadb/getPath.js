const { GET_ALL_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async (event) => {
  const { id: currentPageId } = event.queryStringParameters;
  const path = []; // path to current page
  let loopLimit = 10;

  try {
    const { allPages: { data: allPages } } = await sendQuery(GET_ALL_PAGES);

    path.unshift(
      allPages.find((page) => page._id === currentPageId),
    );

    while (Boolean(loopLimit) && (path[0].parentId !== '0')) {
      path.unshift(allPages.find((page) => page._id === path[0].parentId));
      loopLimit -= 1;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(path),
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
