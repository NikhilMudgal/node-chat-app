const socket = io()

socket.on('message', (data) => {  // client receive data from the server
    console.log(data);
})

document.querySelector('#submit').addEventListener('click', () => {
    const message = document.querySelector('#messsge').value;
    socket.emit('sendMessage', message)
})

