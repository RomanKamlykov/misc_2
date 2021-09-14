const uri = 'mongodb://localhost:27017/jwt_3';
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { uri, options };
