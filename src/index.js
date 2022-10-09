const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express();
const server = http.createServer(app)
const io = socketio(server) // now our server supports web sockets


const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => { // socket is an object that contains info about new connection. Everytime a new connection is established with a server 'connection' is a built in event
 socket.emit('message', "Welcome") // emiting an event
 socket.broadcast.emit('message', 'A new USer has joined') // to emit event to everyone except the one who has emit an event
 socket.on('sendMessage', (data, callback) => { //receiving a message when event triggered
    const filter = new Filter()
    
    if(filter.isProfane(data)) {
        return callback('Profanity is not allowed')
    }
    io.emit('message', data) // emit a connection to every single connection available
    callback('Delivered! to users')
    });
 socket.on('sendLocation', (coordinates, callback) => {
    // io.emit('message', 'Location: ' + coordinates.lat + ',' + coordinates.long);
    io.emit('message', `https://google.com/maps?q=${coordinates.lat},${coordinates.long}`)
    callback(); // callback is sent to only that user who has triggered the event
 })
 socket.on('disconnect', () => { // disconnecr is a built in event which triggers when a user is disconnected from a server
    io.emit('message', 'A USer has left')
 })
})

server.listen(port, () => {
    console.log('Server is up on ' + port);
})