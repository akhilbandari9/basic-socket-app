const socket = io()

const fromMsgCardStyles =
	'bg-primary text-white border py-1 px-3 rounded-2 mb-2 me-auto'
const toMsgCardStyles =
	'bg-secondary text-white border py-1 px-3 rounded-2 mb-2 ms-auto'

const form = document.getElementById('msg-form')
const inputField = document.getElementById('input-field')
const chatRoom = document.getElementById('chatRoomContainer')
const activeUsersDom = document.querySelector('.active-users')

let userName
const newUserConnected = (user) => {
	userName = user || `User${Math.floor(Math.random() * 1000000)}`
	socket.emit('new user', userName)
}

newUserConnected()
form.addEventListener('submit', (e) => {
	e.preventDefault()
	if (inputField.value) {
		socket.emit('chat message', inputField.value)
		let msgCard = document.createElement('div')
		msgCard.textContent = inputField.value
		msgCard.className = toMsgCardStyles
		chatRoom.appendChild(msgCard)
		inputField.value = ''
	}
	chatRoom.scrollTop = chatRoom.scrollHeight
})

socket.on('chat message', (message) => {
	let msgCard = document.createElement('div')
	msgCard.textContent = message
	msgCard.className = fromMsgCardStyles
	chatRoom.appendChild(msgCard)
})

socket.on('new user', (response) => {
	console.log('Active Users', response)
	response.forEach((item) => {
		let li = document.createElement('li')
		li.id = `${item}`
		li.textContent = item
		if (!document.getElementById(item)) {
			activeUsersDom.appendChild(li)
		}
	})
})

socket.on('user disconnected', (userId) => {
	document.getElementById(userId)?.remove()
})
