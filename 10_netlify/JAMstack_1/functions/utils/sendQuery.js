const axios = require('axios');
require('dotenv').config();
const url = "https://graphql.fauna.com/graphql";

module.exports = async (query, variables) => {
    const config = {
        url,
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}` },
        data: { query, variables }
    }
    
    const { data: { data, error } } = await axios(config);
    if (error) {
        console.log(error);
        throw new Error('Something went wrong');
    }
    return data;
}