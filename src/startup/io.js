import server from './server';

const app = require('http').createServer(server);
const socketIO = require('socket.io');

const io = socketIO(app, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  },
});

export { app, io };
