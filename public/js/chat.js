const socket = io() // to connect to the server

socket.on('message', (data) => {  // client receive data from the server
    console.log(data);
})

document.querySelector('#submit').addEventListener('click', (e) => {
    e.preventDefault();
    const message = document.querySelector('#messsge').value;
    socket.emit('sendMessage', message)
})

