// const { USER, PASSWORD, DBNAME } = process.env;
// const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.mfo8h.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017/react_markdown';
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { uri, options };
