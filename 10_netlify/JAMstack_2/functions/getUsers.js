const axios = require('axios');
require('dotenv').config();
const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;


exports.handler = function(event, context, callback) {
    const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`

    // Send user response
    const send = (code, body) => {
        callback(null, {
            statusCode: code,
            body: JSON.stringify(body)
        });
    }

    // Perform API call
    const getUsers = async () => {
        axios.get(URL)
            .then(res=>send(200, res.data))
            .catch(err=>send(500, err));
    }

    // Make sure method is GET
    if(event.httpMethod == 'GET') {
        // Run
        getUsers();
    }
}