const socket = io()

const fromMsgCardStyles =
	'bg-primary text-white border py-1 px-3 rounded-2 mb-2 me-auto'
const toMsgCardStyles =
	'bg-secondary text-white border py-1 px-3 rounded-2 mb-2 ms-auto'

const form = document.getElementById('msg-form')
const inputField = document.getElementById('input-field')
const chatRoom = document.getElementById('chatRoomContainer')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	if (inputField.value) {
		socket.emit('chat message', inputField.value, (response) => {
			console.log(response.status)
		})
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
