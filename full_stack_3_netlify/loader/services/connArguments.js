const { USER, PASSWORD, DBNAME } = process.env;
const connUri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.whqg7.mongodb.net/${DBNAME}`;

const connOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { connUri, connOptions };
