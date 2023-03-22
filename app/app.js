var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let cors = require('cors');
let fs = require("fs")
let md5=require("md5-node")
var app = express();
let jwt = require("jsonwebtoken")

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
app.use(cors())
app.use(require("./routes/teachers.js"))
app.use(require("./routes/classnames.js"))
app.use(require("./routes/students.js"))
app.use(require("./routes/register.js"))
app.use(require("./routes/imghuixian.js"))
app.use(require("./routes/hhtt.js"))
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });




// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
