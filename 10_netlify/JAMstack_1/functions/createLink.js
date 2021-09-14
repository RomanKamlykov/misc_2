const { CREATE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async (event) => {
    const { name, url, description } = JSON.parse(event.body); //тело запроса от React
    const variables = { name, url, description, archived: false }; //создаем новый объект для того, чтобы отправить только необходимые данные
    try {
        const { createLink: createdLink } = await sendQuery(CREATE_LINK, variables);//в ответе приходит объект createLink, переименовываем его в createdLink
        return formattedResponse(200, createdLink);
    } catch (error) {
        console.error(error);
        return formattedResponse(500, { error: 'Something went wrong' });
    }
}