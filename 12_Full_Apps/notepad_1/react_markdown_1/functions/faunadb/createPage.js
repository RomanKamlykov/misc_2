const { READ_PAGE, CREATE_PAGE } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  // const { findPageByID: { folderId } } = await sendQuery(READ_PAGE, { id }); // get parent folder id
  // const object = await sendQuery(READ_PAGE, { id }); // get parent folder id
  // console.log(object);
  // const parentFolderId = object ? object.findPageByID.folderId : 0; // if folderId is undefined, set it to 0

  const date = Date.now();
  const newPage = {
    title: '',
    markdown: '',
    createdAt: date,
    updatedAt: date,
    parentId: id || 0,
  };

  try {
    const { createPage: { _id: createdPageId } } = await sendQuery(CREATE_PAGE, newPage);

    return {
      statusCode: 200,
      body: JSON.stringify(createdPageId),
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
