const router = require('express').Router();

router.get('/login', (req, res) => {
  res.json({ abc: 123 });
});

module.exports = router;
