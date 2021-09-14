const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config').server;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    return next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};
