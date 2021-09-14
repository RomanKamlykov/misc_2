const mongodb = require('mongodb');
const config = require('../config');

// delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) }); // в драйвере mongodb _id особый вид данных, поэтому необходимо обернуть в спецобъект
  res.status(200).send();
})

// add post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  res.status(201).send(); // 201 - значит все Ок + что-то было создано
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true });
  // useNewUrlParser: true / useUnifiedTopology: true для того чтобы не отображалось предупреждение
  return client.db('full_stack_2').collection('posts');
}

module.exports = putDataToDB;