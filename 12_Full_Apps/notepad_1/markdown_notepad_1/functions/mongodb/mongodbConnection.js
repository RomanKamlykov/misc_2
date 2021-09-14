require('dotenv').config();
const { USER, PASSWORD, DBNAME } = process.env;
const connUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.mfo8h.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const connOptions = {
  bufferCommands: false,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { connUri, connOptions };
