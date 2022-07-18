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


io.on('connection', (socket) => { // socket is an object that contains info about new connection
 socket.emit('message', "Welcome")
 socket.on('sendMessage', (data) => {
     io.emit('message', data)
 });
})

server.listen(port, () => {
    console.log('Server is up on ' + port);
})