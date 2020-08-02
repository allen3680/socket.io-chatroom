const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let onlineCount = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
io.on('connection', (socket) => {
  console.log('Hello!');
  onlineCount++;
  io.emit('online', onlineCount);

  socket.on('disconnect', () => {
    // 有人離線了，扣人
    onlineCount = onlineCount < 0 ? 0 : (onlineCount -= 1);
    io.emit('online', onlineCount);
  });

  socket.on('send', (msg) => {
    io.emit('message', msg);
  });
});

server.listen(3000, () => {
  console.log('Server Started. http://localhost:3000');
});
