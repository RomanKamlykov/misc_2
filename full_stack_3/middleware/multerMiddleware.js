const multer = require('multer');

// ---------- dest ----------
const dest = './uploads'

// ---------- fileFilter ----------
const fileFilter = (req, file, cb) => { // cb - callback
  const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
  if(!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }
  cb(null, true);
}

// ---------- limits ----------
const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;
const MAX_SIZE = 20 * MB;

const limits = {
  fileSize: MAX_SIZE
}

// ---------- upload ----------
const upload = multer({
  dest,
  fileFilter,
  limits
})

// ---------- export ----------
module.exports = upload;