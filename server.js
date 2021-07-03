const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use('/', express.static(path.join(__dirname, 'public')))
const server = app.listen(3000, () => console.log('server running on 5000'))
const io = require('socket.io')(server)

io.on('connection', (socket) => {
	socket.on('chat message', (data, callback) => {
		socket.broadcast.emit('chat message', data)
		callback({
			status: 'OK',
		})
	})
})
