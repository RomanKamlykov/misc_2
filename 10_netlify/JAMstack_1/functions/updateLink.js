const { UPDATE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async (event) => {
    const { name, url, description, _id:id, archived } = JSON.parse(event.body); //тело запроса от React
    const variables = { name, url, description, archived, id }; //создаем новый объект для того, чтобы отправить только необходимые данные
    try {
        const { updateLink: updatedLink } = await sendQuery(UPDATE_LINK, variables);//в ответе приходит объект updateLink, переименовываем его в updatedLink
        return formattedResponse(200, updatedLink);
    } catch (error) {
        console.error(error);
        return formattedResponse(500, { error: 'Something went wrong' });
    }
}