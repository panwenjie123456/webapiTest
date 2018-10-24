var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const bookmanage = require("./routes/bookmanage");
const booktypemanage = require("./routes/booktypemanage");
const publishermanage = require("./routes/publishermanage");


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// book1
app.get('/books', bookmanage.findAll);
app.get('/books/votes', bookmanage.findTotalVotes);
app.post('/books',bookmanage.addBook);
app.put('/books/:id/vote', bookmanage.incrementUpvotes);
app.delete('/books/:id', bookmanage.deleteBook);
//book2
app.get('/books/1/detail', bookmanage.findDetail);
app.get('/books/:book_name', bookmanage.findByName);
app.put('/books/:id', bookmanage.update);
app.post('/books/authenticate', bookmanage.returntoken);
//booktype1
app.get('/booktype', booktypemanage.findAll);
app.get('/booktype/votes', booktypemanage.findTotalVotes);

app.post('/booktype',booktypemanage.addBooktype);
app.put('/booktype/:id/vote', booktypemanage.incrementUpvotes);
app.delete('/booktype/:id', booktypemanage.deleteBooktype);
//booktype2
app.get('/booktype/:book_name', booktypemanage.findByName);
//publisher1
app.get('/publisher', publishermanage.findAll);
app.get('/publisher/votes', publishermanage.findTotalVotes);
app.get('/publisher/:id', publishermanage.findOne);
app.post('/publisher',publishermanage.addPublisher);
app.put('/publisher/:id/vote', publishermanage.incrementUpvotes);
app.delete('/publisher/:id', publishermanage.deletePublisher);


var setupRouter = require('./routes/setup')
app.use('/setup', setupRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
