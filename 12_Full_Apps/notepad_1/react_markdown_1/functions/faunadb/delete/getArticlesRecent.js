const faunadb = require('faunadb');
const { GET_PAGES } = require('./utils/pageQueries');
const sendQuery = require('./utils/sendQuery');
require('dotenv').config();

const q = faunadb.query;
// reference
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY, keepAlive: false });
// instance
const {
  Get,
  Ref,
  Collection,
} = faunadb.query;

exports.handler = async () => {
  try {
    // const res = await sendQuery(GET_PAGES);
    // const res = await client.query(
    //   q.Get(q.Ref(q.Collection('Page'), '282077217263976967')),
    // );
    const res = await client.query(
      q.Paginate(q.Documents(q.Collection('Page'))), q.Lambda((x) => q.Get(x)),
    );
    const a = await client.query(
      Get(
        Ref(Collection('Page'), '282077217263976967'),
      ),
    );
    console.log(a);
    //   q.Filter(
    //     q.Paginate(q.Documents(q.Collection('Page'))),
    //     q.Lambda(
    //       'i',
    //       q.Equals(0, q.Modulo(q.Var('i'), 2)),
    //     ),
    //   )
    // )

    // console.log(res);
    // const { data } = res.allPages;
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
