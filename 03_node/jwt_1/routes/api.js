const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

// --- simple route ---
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

// --- route to get a token ---
router.post('/login', (req, res) => {
  // Mock user
  // irl пользователь отправляет username и password
  // происходит процесс аутентификации пользователя с использованием базы данных
  // и из базы данных возвращается пользователь
  const user = {
    id: 2,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  // jwt.sign(payload, secretkey, [options], callback)
  jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    res.json({ token });
  });
});

// --- protected route ---
// route, middleware, callback
router.post('/posts', verifyToken, (req, res) => {
  // jwt.verify(token, secretkey, callback);
  // authData - это будет расшифрованный объект user!
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

module.exports = router;
