const projectName = 'XM360-play';
const args = process.argv.slice(2);
const folderName = args && args[0] ? args[0] : '';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/cache');
const mongoose = require('mongoose');
console.log('[args passed] ', args);
console.log(`[projectName: ${projectName} ...]`);
mongoose.connect(`mongodb://localhost/${projectName}`, { promiseLibrary: require('bluebird'),  useNewUrlParser: true })
  .then(() =>  console.log(`MongoDB connection successful`))
  .catch((err) => {
    console.error('MongoNetworkError: Make sure MongoDB is running');
    console.error(err)
  });

const server = express();

//In express.js the order in which you declare middleware is very important.
// bodyParser middleware must be defined earlier than any other
server.use(bodyParser.json({limit:50000000, type:'application/json'}));
server.use(bodyParser.urlencoded({limit: 50000000, extended: true}));
server.use(bodyParser.text());
server.use(logger('dev'));
server.use(cors());
console.log('CORS enabled');
console.log(`Serving from  ${__dirname}/dist/${projectName}/`);
console.log(`Api server path   ${folderName}/api`);
server.use(`${folderName}/`, express.static(`${__dirname}/dist/${projectName}/`));
server.use(`${folderName}/static`, express.static(`${__dirname}/static/`));
server.use(`${folderName}/versions`, express.static(`${__dirname}/versions/`));
server.use(`${folderName}/api`, apiRouter);

// server.all('/*', function(req, res, next) {
//   // send the index.html for other files to support HTML5Mode
//   res.sendFile('index.html', { root: `${__dirname}/dist/${projectName}/` });
// });

// error handler
server.use(function(err, req, res, next) {
  //res.status(404).render('error');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error('error');
  console.error(err);
  res.sendStatus(err.status || 500);
 // res.sendStatus(err.status);
});






// catch 404 and forward to error handler
// server.use(function(req, res, next) {
//   res.status(404).render('error');
// });


module.exports = server;
