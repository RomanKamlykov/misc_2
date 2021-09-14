module.exports = {
  ENV: process.env.NODE || 'development',
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://abc123:abc123@ds249503.mlab.com:49503/mongoose_2',
  JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}