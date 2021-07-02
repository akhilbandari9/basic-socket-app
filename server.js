const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const path = require('path')

app.use('/', express.static(path.join(__dirname, 'public')))

const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
	console.log('User connected')
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg)
	})
})

server.listen(5000, () => console.log('server running on 5000'))
