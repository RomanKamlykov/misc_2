const config = require('../config')

// ---------- dest ----------
const dest = './uploads'

// ---------- fileFilter ----------
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]

  if(!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type")
    error.code = "LIMIT_FILE_TYPES"
    return cb(error, false)
  }

  cb(null, true)
}

// ---------- limits ----------
const KB = 1024
const MB = 1024 * 1024
const GB = 1024 * 1024 * 1024

const limits = {
  fileSize: config.MAX_SIZE_OF_UPLOADED_FILE
}

// ---------- export ----------
module.exports = {
  dest,
  fileFilter,
  limits
}