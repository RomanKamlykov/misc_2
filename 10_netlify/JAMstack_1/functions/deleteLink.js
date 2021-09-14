const { DELETE_LINK } = require("./utils/linkQueries");
const sendQuery = require("./utils/sendQuery");
const formattedResponse = require("./utils/formattedResponse");

exports.handler = async (event) => {
    if (event.httpMethod !== 'DELETE') { //контроль запросов
        return formattedResponse(405, { error: 'Method not supported' });
    }
    const { _id:id } = JSON.parse(event.body); //тело запроса от React
    const variables = { id }; //создаем новый объект для того, чтобы отправить только необходимые данные
    try {
        const { deleteLink: deletedLink } = await sendQuery(DELETE_LINK, variables);//в ответе приходит deleteLink, переименовываем его в deletedLink
        return formattedResponse(200, deletedLink);
    } catch (error) {
        console.error(error);
        return formattedResponse(500, { error: 'Something went wrong' });
    }
}