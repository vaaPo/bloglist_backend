//Part 4 - total rewrite with middleware config.js etc controllers, should support now dev,test,prod environments
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
var morgan = require('morgan');
const blogsRouter = require('./controllers/ES7/ASYNCblogscontroller');
const usersRouter = require('./controllers/ES7/ASYNCuserscontroller');
const config = require('./utils/config');
const loginRouter = require('./controllers/login');

//https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars
//DeprecationWarning: current URL string parser is deprecated,
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

mongoose
  .connect(config.mongoUrl,{ useNewUrlParser: true })
//  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl);
  })
  .catch( err => {
    console.log(err);
  });


//https://github.com/Automattic/mongoose/issues/7108
//DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
//FIXME, check if needed mongoose.set('useFindAndModify', false);
//mongoose.set('useFindAndModify', false);
//
// LOTS OF middleware stuff here:
app.use(cors()); //https://github.com/expressjs/cors
//https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

app.use(bodyParser.json());
//app.use(morgan('combined'));
//https://github.com/expressjs/morgan#creating-new-tokens
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

app.use(morgan(function (tokens, req, res) { //app.use(morgan('tiny'));      //FIXME hw3.7 morgan('tiny')
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    JSON.stringify(req.body),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
})); //morgan(':method :url :status :res[content-length] - :response-time ms')

app.use(express.static('build'));
app.use(middleware.logger);
/**
app.use('/api/notes', notesRouter);   // notecontroller has nomore /api/notes path prefixed
app.use('/api/persons', personsRouter);   // personsontroller has nomore /api/persons path prefixed
app.use('/api/users', usersRouter);       // usersRouter has users for notes
app.use('/api/login', loginRouter);
 */
//FIXME token middleware
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);       // usersRouter has users for blogs ---notes
app.use('/api/blogs', blogsRouter);
app.use('/api/login', loginRouter);

app.use(middleware.error);

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

server.on('close', () => {
  mongoose.connection.close();
});

//if (usemongoose === 'NO') {
//  repl.start('> ').context.notes = notes;
//}

module.exports = {
  app, server
};
//mluukk defacto solution above, copy my extras into it
//FIXME I need mluukk lint :)