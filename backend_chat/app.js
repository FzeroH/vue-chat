const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const users = require('./users')();
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
server.listen(port)

const messageObject = (username, text, userId) => ({ username, text, userId });

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', (data, cb) => {
        if(!data.username || !data.roomId){
            return cb('Данные некорректны')
        }
        cb({userId: socket.id})
        socket.join(data.roomId)
        users.removeUser(socket.id)
        users.addUser({
            userId: socket.id,
            username: data.username,
            room: data.roomId
        })

        socket.emit('getUserList', users.getByRoom(data.roomId))
        socket.on('setUserId', (userId) => {
            socket.emit('getUserData', users.getUser(userId))
        })

        socket.emit('authMessage', messageObject(
            'admin',
            `Добро пожаловать, ${data.username}`,
            socket.id));

        socket.broadcast.to(data.roomId).emit('authMessage',messageObject(
            'admin',
            `Пользователь ${data.username} зашёл в комнату`)
        );
      });

    socket.on('createMessage', (data) =>{
        if(!data.text) {
            console.error('Текстовое поле не может быть пустым')
        }
        const user = users.getUser(data.userId)
        if (user) {
            io.to(user.room).emit('newMessage',messageObject(user.username,data.text,data.userId))
            console.log(data);
        }
    });
});

module.exports = app;
