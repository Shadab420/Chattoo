const io = require('socket.io')(3000)


io.on('connection', socket => {

	socket.on('user-joined', username => {
		socket.broadcast.emit('new-user', username)
	})
	
	socket.on('send-chat-message', message => {
		socket.broadcast.emit('chat-message', message)
	})
})