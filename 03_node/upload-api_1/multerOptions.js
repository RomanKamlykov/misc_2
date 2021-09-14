// ---------- dest ----------
const dest = './uploads'

// ---------- fileFilter ----------
const fileFilter = (req, file, cb) => { // cb - callback
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
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
const MAX_SIZE = 1 * MB;

const limits = {
  fileSize: MAX_SIZE
}

// ---------- export ----------
module.exports = {
  dest,
  fileFilter,
  limits
}