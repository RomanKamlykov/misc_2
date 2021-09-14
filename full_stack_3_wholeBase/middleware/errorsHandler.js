// const config = require('../config');

const errorsHandler = (err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_TYPES') {
    res.status(415).json({ error: 'Only Excel files are allowed' });
    return;
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({ error: `Too large. Max size is ${(20 * 1024 * 1024) / 1024}kb` });
  }
  next();
};

module.exports = errorsHandler;
