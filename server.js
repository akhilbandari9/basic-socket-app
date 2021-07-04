const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use('/', express.static(path.join(__dirname, 'public')))
const server = app.listen(3000, () => console.log('server running on 3000'))
const io = require('socket.io')(server)

let activeUsers = new Set()

io.on('connection', (socket) => {
	socket.on('new user', (data) => {
		socket.userid = data
		activeUsers.add(data)
		io.emit('new user', [...activeUsers])
	})

	socket.on('chat message', (data, callback) => {
		socket.broadcast.emit('chat message', data)
	})

	socket.on('disconnect', () => {
		io.emit('user disconnected', socket.userid)
		activeUsers.delete(socket.userid)
	})
})
