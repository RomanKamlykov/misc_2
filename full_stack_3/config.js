module.exports = {
  ENV: process.env.NODE || 'development',
  PORT: process.env.PORT || 5000,
  URL: process.env.BASE_URL || 'http://localhost:5000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://abc123:abc123@ds261078.mlab.com:61078/full_stack_2'
}