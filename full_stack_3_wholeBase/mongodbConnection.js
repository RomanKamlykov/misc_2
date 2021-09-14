const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DBNAME } = process.env;
// const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.whqg7.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;
const uri = 'mongodb://localhost:27017/omega_base';
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { uri, options };
