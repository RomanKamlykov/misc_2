const express = require('express');
const mongodb = require('mongodb'); // документация https://github.com/mongodb/node-mongodb-native
const config = require('../config');

const router = express.Router();

// get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray()); // все posts, но можем добавить query
})

// add post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({ text: req.body.text, createdAt: new Date() });
  res.status(201).send(); // 201 - значит все Ок + что-то было создано
})

// delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) }); // в драйвере mongodb _id особый вид данных, поэтому необходимо обернуть в спецобъект
  res.status(200).send();
})

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology: true });
  // useNewUrlParser: true / useUnifiedTopology: true для того чтобы не отображалось предупреждение
  return client.db('full_stack_2').collection('posts');
}

module.exports = router;