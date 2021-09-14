const jwt = require('jsonwebtoken');

module.exports = function (headers) {
  const { authorization } = headers;
  const token = authorization.split(' ')[1];

  // const token = req.cookies['auth-token'];
  // if (!token) return res.status(401).redirect('/login');
  try {
    const secret = process.env.TOKEN_SECRET;
    const verified = jwt.verify(token, secret);
    // req.user = verified;
    return verified;
  } catch (error) {
    return null;
    // res.status(400).redirect('/login');
  }
};
