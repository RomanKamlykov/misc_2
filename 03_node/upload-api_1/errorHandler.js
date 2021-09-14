const MAX_SIZE = require('./multerOptions.js').limits.fileSize;

const errorHandler = (err, req, res, next) => {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE/1024}kb` });
    return;
  }
}

module.exports = errorHandler;