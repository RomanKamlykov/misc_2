const router = require('express').Router();

const posts = [
  { title: 'test', description: 'test' },
  { title: 'test2', description: 'test2' },
];

router.get('/', (req, res) => {
  res.json(posts);
});

module.exports = router;
