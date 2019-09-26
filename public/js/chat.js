const socket = io()

//elements
const $mesageForm = document.querySelector('#message-form')
const $mesageFormInput = $mesageForm.querySelector('input')
const $mesageFormButton = $mesageForm.querySelector('button')

socket.on('message', (message) => {
    console.log(message)
})

$mesageForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    $mesageFormButton.setAttribute('disabled','disables')

    const message = e.target.elements.message.value
    socket.emit('sendMessage',message, (message) => {
        $mesageFormButton.removeAttribute('disables')
        console.log('Message delivered!',message)
    })
})

document.querySelector('#send-location').addEventListener('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser'); 
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },() => {
            console.log('location shared')
        });
        
    })

})