const config = require('../config')

const errorsHandler = (err, req, res, next) => {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(415).json({ error: "Only Excel files are allowed" })
    return
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(413).json({ error: `Too large. Max size is ${config.MAX_SIZE_OF_UPLOADED_FILE/1024}kb` })
    return
  }
}

module.exports = errorsHandler