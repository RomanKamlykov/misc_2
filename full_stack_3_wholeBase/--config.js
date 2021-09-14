const { USER, PASSWORD, DBNAME } = process.env;

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  // MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI: `mongodb+srv://${USER}:${PASSWORD}@cluster0.mfo8h.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`,
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION,
  MAX_SIZE_OF_UPLOADED_FILE: process.env.MAX_SIZE_OF_UPLOADED_FILE,
  NUMBER_OF_VALUES_ON_A_PAGE: process.env.NUMBER_OF_VALUES_ON_A_PAGE,
};
