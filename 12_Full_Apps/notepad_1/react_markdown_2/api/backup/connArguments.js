// const { USER, PASSWORD, DBNAME } = process.env;
// const connUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;
// const connUri = 'mongodb://localhost:27017/react_markdown';
const connUri = 'mongodb+srv://roman:Ada117121@cluster0.mfo8h.gcp.mongodb.net/blog?retryWrites=true&w=majority';
const connOptions = {
  // bufferCommands: false,
  // bufferMaxEntries: 0,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { connUri, connOptions };
