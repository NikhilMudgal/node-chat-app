const socket = io()

socket.on('countUpdated', (data) => {  // client receive data from the server
    console.log('The count has been updated ', data);
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked')
    socket.emit('increment')
})
