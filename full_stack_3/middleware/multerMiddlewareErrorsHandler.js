const errorsHandler = (err, req, res, next) => {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(415).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(413).json({ error: 'Too large' });
    return;
  }
}

module.exports = errorsHandler;