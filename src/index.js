const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT | 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {

    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','A new youer has joined')

    socket.on('sendMessage', (message,callback) => {
        io.emit('message',message)
        callback('Delivered')
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message',`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message','A user has left')
    })
})

server.listen(port,() =>{
    console.log('server running on port ',port)
})
