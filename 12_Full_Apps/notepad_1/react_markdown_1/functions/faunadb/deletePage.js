const { DELETE_PAGE, GET_ALL_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  // const variables = { id };

  // --- start ---
  // check if there is a child page
  const { allPages: { data: allPages } } = await sendQuery(GET_ALL_PAGES);

  // const currentPage = allPages.find((page) => page._id === id);
  const childPage = allPages.find((page) => page.parentId === id);
  if (childPage) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Page has a child page!' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  // --- end ---

  try {
    const { deletePage: deletedPage } = await sendQuery(DELETE_PAGE, { id });

    return {
      statusCode: 200,
      body: JSON.stringify(deletedPage),
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
