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

let count  = 0;
io.on('connection', (socket) => { // socket is an object that contains info about new connection
 console.log('new web socket connection')
 socket.emit('countUpdated', count) // it will emit the event and send the data to all new connections

 socket.on('increment', () => {
    count ++
    socket.emit('countUpdated', count) // emiting an event to a particular connection
    io.emit('countUpdated',count) // io will emit an event to all the connections
 })
})

server.listen(port, () => {
    console.log('Server is up on ' + port);
})