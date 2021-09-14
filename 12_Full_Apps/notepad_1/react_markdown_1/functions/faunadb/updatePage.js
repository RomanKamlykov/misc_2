const { READ_PAGE, UPDATE_PAGE } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
const titleMaker = require('./utils/titleMaker');

exports.handler = async (event) => {
  const { id, markdown, parentId } = JSON.parse(event.body); // тело запроса от React
  // const { id } = JSON.parse(event.body);
  const { findPageByID: page } = await sendQuery(READ_PAGE, { id });
  // const variables = { id };

  // console.log(page);
  // console.log(event.body);

  // const date = Date.now();
  // const title = titleMaker(markdown);

  if (markdown) {
    // const title = titleMaker(markdown);
    page.title = titleMaker(markdown);
    page.markdown = markdown;
  }

  if (parentId) {
    page.parentId = parentId;
  }

  page.updatedAt = Date.now();

  // console.log(article);
  // const variables = {
  //   key: date,
  //   parent,
  //   title,
  //   markdown,
  //   createdAt: date,
  //   updatedAt: date,
  //   isFavorite: false,
  // }; // создаем новый объект для того, чтобы отправить только необходимые данные
  // console.log({
  //   ...article, updatedAt: date, title, markdown, isFavorite,
  // });
  try {
    const { updatePage: updatedPageId } = await sendQuery(UPDATE_PAGE, { ...page });
    // в ответе приходит объект createLink, переименовываем его в createdLink
    return {
      statusCode: 200,
      body: JSON.stringify(updatedPageId),
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
