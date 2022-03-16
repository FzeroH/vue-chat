const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

let http = require('http');
let server = http.createServer(app);
let { Server } = require('socket.io');
let io = new Server(server,  {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
let port = 8080

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
server.listen(port)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('test', 'Александр');
  socket.on('login', (data, cb) => {
      if(!data.username || !data.roomId){
          return cb('Данные некорректны')
      }
      cb({userId: socket.id})
      console.log(`Пользователь ${data.username} вошёл в комнату ${data.roomId}`);
  })
});

module.exports = app;
