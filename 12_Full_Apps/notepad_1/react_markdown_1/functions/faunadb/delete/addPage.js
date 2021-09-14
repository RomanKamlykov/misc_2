const { CREATE_PAGE } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');

exports.handler = async (event) => {
  const { title, body } = JSON.parse(event.body); // тело запроса от React
  const variables = {
    title, body, favorite: false, archived: false,
  }; // создаем новый объект для того, чтобы отправить только необходимые данные
  try {
    const { createPage: createdPage } = await sendQuery(CREATE_PAGE, variables);
    // в ответе приходит объект createLink, переименовываем его в createdLink
    return {
      statusCode: 200,
      body: JSON.stringify(createdPage),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};

// exports.handler = async (event) => {
//   const { title, body } = JSON.parse(event.body);

//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//       bufferMaxEntries: 0,
//     });

//     const page = new Page({
//       title,
//       body,
//     });

//     await page.save();
//     await mongoose.disconnect();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(page),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Something went wrong' }),
//     };
//   }
// };
