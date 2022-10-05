const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server) // now our server supports web sockets


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => { // socket is an object that contains info about new connection. Everytime a new connection is established with a server
 socket.emit('message', "Welcome") // emiting an event
 socket.on('sendMessage', (data) => { //receiving a message when event triggered
     io.emit('message', data) // emit a connection to every single connection available
 });
})

server.listen(port, () => {
    console.log('Server is up on ' + port);
})