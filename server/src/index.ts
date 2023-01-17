import express from 'express';
import path from 'path';
import {Server} from 'socket.io';

const app = express();
const server = app.listen(8000);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (message) => {
    console.log('message: ' + message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});