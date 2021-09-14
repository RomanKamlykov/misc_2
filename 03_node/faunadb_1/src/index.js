// @ts-check
const app = require('express')();
const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: 'fnAD51Af7OACB3IjS6TW5iykkjAZHvJAGvAd3bwG' });

app.listen(5000, () => console.log('API on http://localhost:5000'));

const {
  Ref,
  Paginate,
  Get,
  Match,
  Select,
  Index,
  Create,
  Collection,
  Join,
} = faunadb.query;

app.get('/tweet/:id', async (req, res) => {
  const doc = await client.query(
    // insert FQL here
    Get(
      // function composition
      Ref(
        Collection('tweets'),
        req.params.id,
      ),
    ),
  ).catch((e) => res.send(e));

  res.send(doc);
});

app.post('/tweet', async (req, res) => {
  const data = {
    user: Select('ref', Get(Match(Index('users_by_name'), 'John'))), // можем читать документы при выолнении других операций
    text: 'Hola Mundo!',
  };
  const doc = await client.query(
    Create(
      Collection('tweets'),
      { data },
    ),
  ).catch((e) => res.send(e));

  res.send(doc);
});

app.get('/tweet', async (req, res) => {
  const docs = await client.query(
    Paginate(
      Match(
        Index('tweets_by_user'),
        Select('ref', Get(Match(Index('users_by_name'), 'John'))),
      ),
    ),
  ).catch((e) => res.send(e));

  res.send(docs);
});

app.post('/relationship', async (req, res) => {
  const data = {
    follower: Select('ref', Get(Match(Index('users_by_name'), 'John'))),
    followee: Select('ref', Get(Match(Index('users_by_name'), 'Brad'))),
  };
  const doc = await client.query(
    Create(
      Collection('relationship'),
      { data },
    ),
  );

  res.send(doc);
});

app.get('/feed', async (req, res) => {
  const docs = await client.query(
    Paginate(
      Join(
        Match(
          Index('followers_by_followee'),
          Select('ref', Get(Match(Index('users_by_name'), 'Brad'))),
        ),
        Index('tweets_by_user'),
      ),
    ),
  ).catch((e) => res.send(e));

  res.send(docs);
});

/**
 * @param {number} a Some number
 * @param {number} b Same
 * @return {number}
 */
function fu(a, b) {
  return a + b;
}

fu(1, 2);
