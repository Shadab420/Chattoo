const socket = io('http://localhost:3000')

const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const username = prompt('Whats your name?')

socket.emit('user-joined', username);
socket.on('new-user', username => {
	newUserAnnounce(username)
})

socket.on('chat-message', data => {
	appendMessage(data)
})

messageForm.addEventListener('submit', e => {
	
	e.preventDefault();
	
	const message = messageInput.value
	const userMessage = '<h4>'+username+': '+message+'</h4>'
	appendMessage(userMessage)
	socket.emit('send-chat-message', userMessage)
	messageInput.value = ''	
})

function newUserAnnounce(username){
	const messageElement = document.createElement('div');
	messageElement.innerHTML = '<h4 style="background: blue; color: yellow;">'+username+' joined in chattoo!</h4>';
	messageContainer.append(messageElement);
}

function appendMessage(message){
	const messageElement = document.createElement('div');
	messageElement.innerHTML = message;
	messageContainer.append(messageElement);
}
