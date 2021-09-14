const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = (server) => {
  // Register User
  server.post('/register', (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
      email,
      password
    });

    // шифровка пароля
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;
        // Save User
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (error) {
          return next(new errors.InternalError(error.message));
        }
      });
    });
  });

  // Auth User
  server.post('/auth', async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
      // Auth User
      const user = await auth.authenticate(email, password);
      
      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m'
      });

      const { iat, exp } = jwt.decode(token);
      // iat - issued at, когда создан, exp - expiration, действителен до

      // Respond with token
      res.send({ iat, exp, token });

      next();
    } catch (error) {
      // User unauthorized
      return next(new errors.UnauthorizedError(error));
    }
  });
}