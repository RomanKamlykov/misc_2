const axios = require('axios');
const FAUNA_SECRET_KEY = "fnAD3Vtw8vACB33OqEVsxc3o7IEbvA3eL1HvBARx"
const url = "https://graphql.fauna.com/graphql"

exports.handler = async (event) => {
    const GET_LINKS = `
        query {
            allLinks {
                data {
                    _id
                    name
                }
            }
        }
    `
    const config = {
        url,
        method: 'POST',
        headers: { Authorization: `Bearer ${FAUNA_SECRET_KEY}` },
        data: { query: GET_LINKS, variables: {} }
    }

    const { data } = await axios(config);

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}