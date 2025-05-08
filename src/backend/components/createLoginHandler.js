const createLoginHandler = function(socket) {

    return {
        loginReciver: function (database) {
            socket.on('loginSender', async (message) => {

                let data = await database.getUser(message.email, message.password);
                
                if(data.length == 1) {
                    socket.emit('loginReciver', 'ok');
                } else {
                    socket.emit('loginReciver', 'ko');
                }

            })
        }
    }

}

module.exports = createLoginHandler;