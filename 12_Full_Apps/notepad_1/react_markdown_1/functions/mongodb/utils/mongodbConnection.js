const { USER, PASSWORD, DBNAME } = process.env;
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.mfo8h.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const options = {
  bufferCommands: false,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { uri, options };
