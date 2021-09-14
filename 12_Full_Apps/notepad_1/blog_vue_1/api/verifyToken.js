const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies['auth-token'];
  if (!token) return res.status(401).redirect('/login');
  try {
    const secret = process.env.TOKEN_SECRET;
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).redirect('/login');
  }
};
