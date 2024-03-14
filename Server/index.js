// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

// Allow CORS for specific origins and methods
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from this origin
    res.setHeader('Access-Control-Allow-Methods', '*'); // Allow GET and POST requests
    next();
});

const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
      origin: "http://localhost:4200", // Allow requests from this origin
      methods: ['*'] // Allow GET and POST requests
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle custom events
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

