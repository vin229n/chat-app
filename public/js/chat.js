const socket = io()

//elements
const $mesageForm = document.querySelector('#message-form')
const $mesageFormInput = $mesageForm.querySelector('input')
const $mesageFormButton = $mesageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML 
const locationTemplate = document.querySelector('#location-template')

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        message
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage',(url) => {
    console.log(url)
})

$mesageForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    $mesageFormButton.setAttribute('disabled','disables')

    const message = e.target.elements.message.value
    socket.emit('sendMessage',message, (message) => {
        $mesageFormButton.removeAttribute('disabled')
        $mesageFormInput.value= '';
        $mesageFormInput.focus();
        console.log('Message delivered!',message)
    })
})

$sendLocationButton.addEventListener('click', (e) => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser'); 
    }

    $sendLocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },() => {
            console.log('location shared')
            $sendLocationButton.removeAttribute('disabled')
        });
        
    })

})