var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// 解决跨域问题
var cors = require('cors');

// http 日志打印
var logger = require('morgan');
var fs = require('fs');
var accessLog = fs.createWriteStream('./access.log', {flags : 'a'});

const indexRouter = require('./routes/index');
const goodsRouter = require('./routes/goods');
const uploadRouter = require('./routes/upload');
const Token = require('./utils/token');

var app = express();

// 异常处理
process.on('uncaughtException', (e) => {
  console.log('我能进来，说明可以处理异常');
  console.log(e);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(logger('combined', {stream : accessLog}));      //打印到log日志

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // 登录
app.use('/api', Token.checkToken); // /api/* 需要验证token
app.use('/api/goods', goodsRouter) // 增删改查接口
app.use('/api/upload', uploadRouter) // 上传接口

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
