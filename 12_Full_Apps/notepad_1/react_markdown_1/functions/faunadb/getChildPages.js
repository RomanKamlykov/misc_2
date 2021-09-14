const { READ_PAGE, GET_CHILD_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;

  try {
    // if (currentPageId === undefined) {
    //   const { pagesList: { data: pages } } = await sendQuery(GET_PAGES_LIST, { folder: 0 });

    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(pages),
    //   };
    // }

    // const { findArticleByID: currentPage } = await sendQuery(READ_PAGE, { id: currentPageId });

    const variables = { parentId: id || 0 };
    const { childPages: { data: pages } } = await sendQuery(GET_CHILD_PAGES, variables);

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
