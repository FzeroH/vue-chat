import io from 'socket.io-client';

const url = 'http://localhost:8080';

const socket = io(url, {
  reconnectionDelay: 5000,
});

export const login = (authState) => {
  // eslint-disable-next-line consistent-return
  socket.emit('login', authState, (data) => {
    if (typeof data === 'string') {
      // eslint-disable-next-line no-console
      console.log(data);
      return false;
    }
    // eslint-disable-next-line no-console
    console.log(`Пользователь ${data.username} вошёл в чат`);
  });
};

export const connectToChat = (messages = []) => {
  socket.on('authMessage', (resp) => {
    // eslint-disable-next-line
    console.log(`Я вошёл!!!! ${resp.username} \n${resp.text}`);
    messages.push(resp);
  });
};
