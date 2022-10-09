const socket = io() // to connect to the server

const $messagFormButton = document.querySelector('#submit')
const $messagFormInput = document.querySelector('#messsge')

socket.on('message', (data) => {  // client receive data from the server
    console.log(data);
})

$messagFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    $messagFormButton.setAttribute('disabled', 'true')

    const message = document.querySelector('#messsge').value;
    socket.emit('sendMessage', message, (error) => {
        $messagFormButton.removeAttribute('disabled')
        $messagFormInput.value = ''
        $messagFormInput.focus()
        // console.log('The message was ', message)
        if(error) {
            return console.log(error)
        }
        console.log('Message Delivered')
    })
})

document.querySelector('#sendLocation').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supportive by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        socket.emit('sendLocation', {lat, long}, () => {
            console.log('Location Shared');
        })
    });
});

