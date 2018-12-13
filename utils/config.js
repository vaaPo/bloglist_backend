//const config = require('./utils/config');
// this config.js requires environment variables in .env which should be in .gitignore
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let port = process.env.PORT;
let mongoUrl = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT;
  mongoUrl = process.env.TEST_MONGODB_URI;
}

module.exports = {
  mongoUrl,
  port
};

